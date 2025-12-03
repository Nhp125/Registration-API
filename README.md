# Registration-API

Đây là project demo cho hệ thống đăng ký / đăng nhập người dùng.
Nó gồm hai phần tách biệt:

- `backend/` — API (NestJS + Mongoose). Endpoint chính:
  - `POST /user/register` — đăng ký (trả về 201 hoặc 409 nếu email đã tồn tại)
  - `POST /user/login` — đăng nhập (trả về 200 nếu hợp lệ; 401 nếu sai thông tin)
- `frontend/` — ứng dụng React (Vite) dùng React Hook Form + React Query để gọi API.

Sau đây là hướng dẫn cài đặt và chạy trên máy Windows (PowerShell).

**Yêu cầu**

- Node.js v16+ (hoặc phiên bản tương thích với dự án)
- MongoDB (local hoặc remote) — cần kết nối trong biến môi trường `MONGO_URI`.

**Cấu trúc quan trọng**

- `backend/` — mã nguồn NestJS trong `backend/src`
- `frontend/` — mã nguồn React trong `frontend/src`

**Biến môi trường (ví dụ)**

- `backend/.env` (copy từ `backend/.env.example`):
  - `MONGO_URI=mongodb://localhost:27017/registration-api`
  - `PORT=5000` (tùy chọn)
  - `CLIENT_ORIGIN=http://localhost:3000` (tùy nếu CORS cần)

**Chạy backend (phát triển)**
Mở PowerShell, cài phụ thuộc và chạy:

```powershell
cd '\backend'
npm install
# Tạo file .env nếu cần (copy từ .env.example)
npm run start:dev
```

Lưu ý: script `start:dev` dùng `ts-node-dev`/`nest` để chạy ở chế độ phát triển. Nếu gặp lỗi, xem console để biết chi tiết.

**Chạy frontend (phát triển)**
Mở PowerShell khác và chạy:

```powershell
cd '\frontend'
npm install
npm run dev
```

Frontend mặc định gửi request tới `VITE_API_BASE` (nếu đặt trong `.env`) hoặc `http://localhost:5000`.

**Kiểm thử nhanh (đăng ký / đăng nhập)**

1. Mở frontend, vào trang Sign Up.
2. Đăng ký một email mới — thành công => hiển thị thông báo xanh.
3. Thử đăng ký lại email đó — backend sẽ trả 409 và frontend sẽ hiển thị lỗi `Email đã tồn tại` trên ô email.
4. Chuyển sang Login và đăng nhập:
   - Email đúng + mật khẩu đúng => hiển thị `Đăng nhập thành công`.
   - Mật khẩu sai => backend trả 401 và frontend sẽ hiển thị lỗi `Sai email hoặc mật khẩu`.

**Xử lý lỗi phổ biến**

- Nếu frontend không kết nối tới backend, kiểm tra `VITE_API_BASE` trong `frontend/.env` hoặc chạy dev server backend ở `http://localhost:5000`.
- Nếu backend báo lỗi kết nối Mongo — kiểm tra `MONGO_URI` và trạng thái MongoDB.

**Tập tin thừa / legacy (đề xuất)**
Trong quá trình chuyển từ Express sang NestJS, repo còn lưu các file cũ không còn dùng nữa. Chúng không bắt buộc nhưng có thể gây nhầm lẫn — bạn có thể xóa hoặc chuyển chúng vào một nhánh backup.

Đề xuất xóa (an toàn nếu bạn đang dùng NestJS trong `backend/src`):

- `backend/server.js` ← file server Express cũ
- `backend/routes/` ← router Express cũ
- `backend/models/` ← models Mongoose cũ (nếu đã được thay thế)
- `backend/README.md` ← README riêng trong `backend/` (giữ nếu bạn muốn hướng dẫn tách)

Để xóa an toàn (Git):

```powershell
cd '\backend'
git rm -r server.js routes models
git commit -m "chore: remove legacy Express files"
```

Hoặc nếu muốn giữ bản sao lưu, di chuyển vào `archive/legacy-express/` thay vì xóa.

**Ghi chú tiếp theo**

- Nếu bạn muốn thêm JWT trên login, mình có thể bổ sung issuance và lưu token trên frontend.
- Nếu muốn, mình sẽ tự động xóa các file legacy (mình sẽ tạo commit và backup), hoặc bạn có thể phê duyệt trước.

Nếu cần mình thực hiện xóa các file thừa, xác nhận và mình sẽ tiến hành (mình sẽ tạo commit sửa đổi).
