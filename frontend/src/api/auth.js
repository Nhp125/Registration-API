import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export async function registerUser(payload) {
  try {
    const res = await axios.post(`${API_BASE}/user/register`, payload);
    return res.data;
  } catch (err) {
    // Prefer server-provided message when available
    const serverMsg = err?.response?.data?.message;
    if (serverMsg) {
      throw new Error(serverMsg);
    }

    // Map 409 to a friendly Vietnamese message if server didn't provide one
    if (err?.response?.status === 409) {
      throw new Error("Email đã tồn tại");
    }

    // Fallback to axios/error message
    throw new Error(err?.message || "Request failed");
  }
}

export async function loginUser(payload) {
  try {
    const res = await axios.post(`${API_BASE}/user/login`, payload);
    return res.data;
  } catch (err) {
    const serverMsg = err?.response?.data?.message;
    if (serverMsg) {
      throw new Error(serverMsg);
    }

    if (err?.response?.status === 401) {
      throw new Error("Sai email hoặc mật khẩu");
    }

    throw new Error(err?.message || "Request failed");
  }
}
