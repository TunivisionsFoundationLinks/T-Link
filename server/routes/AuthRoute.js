import express from "express";
import {
  loginUser,
  registerUser,
  registerUserAdmin,
  loginUserAdmin,
  sendEmails,
  ForgotPassword,
  ResetPassword,
} from "../controllers/AuthController.js";
import authMiddleWare from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/registerAdmin", registerUserAdmin);
router.post("/sendMail", sendEmails);
router.post("/forget-password", ForgotPassword);
router.post("/reset-password/:id",authMiddleWare ,ResetPassword);

router.post("/login", loginUser);
router.post("/loginAdmin", loginUserAdmin);

export default router;
