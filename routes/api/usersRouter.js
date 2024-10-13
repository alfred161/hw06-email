import express from "express";
import {
  getCurrentUsers,
  loginUser,
  logoutUser,
  resendVerifyEmail,
  signupUser,
  updateAvatar,
  updateUserSubscription,
  verifyEmail,
} from "../../controllers/usersController.js";
import { authenticateToken } from "../../middlewares/auth.js";
import { upload } from "../../middlewares/upload.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", authenticateToken, logoutUser);
router.get("/current", authenticateToken, getCurrentUsers);
router.patch("/", authenticateToken, updateUserSubscription);
router.patch(
  "/avatars",
  authenticateToken,
  upload.single("avatar"),
  updateAvatar
);
router.get("/verify/:verificationToken", verifyEmail);
router.post("/verify", authenticateToken, resendVerifyEmail);

export { router };
