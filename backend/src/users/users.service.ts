import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { User, UserDocument } from "./schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    // check existing
    const existing = await this.userModel.findOne({ email }).exec();
    if (existing) {
      throw new ConflictException("Email already registered");
    }

    try {
      const saltRounds = 10;
      const hashed = await bcrypt.hash(password, saltRounds);

      const created = new this.userModel({ email, password: hashed });
      await created.save();

      return { message: "User registered successfully" };
    } catch (err) {
      console.error("UsersService.create error", err);
      throw new InternalServerErrorException("Failed to create user");
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new UnauthorizedException("Invalid credentials");
    }

    // For now, return a safe minimal profile (no password)
    return { id: user._id.toString(), email: user.email };
  }
}
