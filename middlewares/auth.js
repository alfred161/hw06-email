import "dotenv/config";
import jwt from "jsonwebtoken";
import { User } from "../models/usersModel.js";

const { SECRET_KEY } = process.env;

const authenticateToken = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || user.token !== token || !user.token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized" });
  }
};

export { authenticateToken };
