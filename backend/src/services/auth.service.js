import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../config/jwt.js"

class AuthService {
  async register(data) {
    const { name, email, password } = data;

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error("Email already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user);

    return { user, token };
  }

  async login(data) {
    const { email, password } = data;

    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid email or password");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid email or password");

    const token = generateToken(user);

    return { user, token };
  }
}

export default new AuthService();
