import express from "express";
import {
  loginUser,
  registerUser,
  registerUserAdmin,
  loginUserAdmin,
} from "../controllers/AuthController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/registerAdmin", registerUserAdmin);

router.post("/login", loginUser);
router.post("/loginAdmin", loginUserAdmin);

export default router;
