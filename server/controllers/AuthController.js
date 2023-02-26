import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register new user
export const registerUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass;
  const newUser = new UserModel(req.body);
  const { email } = req.body;
  try {
    // addition new
    const oldUser = await UserModel.findOne({ email });
    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    // changed
    const user = await newUser.save();
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWTKEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Register new admin account
export const registerUserAdmin = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass;
  const newUser = new UserModel(req.body);
  const { email } = req.body;
  const { Chapter } = req.body.Chapter;
  const { role } = req.body.role;

  try {
    // addition new
    const oldUser = await UserModel.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const reservedChapter = await UserModel.findOne({
      Chapter: Chapter,
    });

    const reservedRole = await UserModel.findOne({
      role: role,
    });
    if (!reservedChapter && !reservedRole)
      return res.status(400).json({ message: "Role already reserved !!" });

    // changed
    const user = await newUser.save();
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User

// Changed
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });

    if (user) {
      const validity = await bcrypt.compare(password, user.password);

      if (!validity) {
        res.status(400).json("wrong password");
      } else {
        const token = jwt.sign(
          { email: user.email, id: user._id },
          process.env.JWTKEY,
          { expiresIn: "1h" }
        );
        res.status(200).send({ user, token });
      }
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
// Changed
export const loginUserAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });
    if (user.isAdmin === true) {
      if (user) {
        const validity = await bcrypt.compare(password, user.password);

        if (!validity) {
          res.status(400).json("wrong password");
        } else {
          const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWTKEY,
            { expiresIn: "1h" }
          );
          res.status(200).send({ user, token });
        }
      } else {
        res.status(404).json("password not correct");
      }
    } else {
      res.status(404).json("you don't have access to this page");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
