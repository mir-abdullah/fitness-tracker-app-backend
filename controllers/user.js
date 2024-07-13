import express from "express";
import { User } from "../models/user.js";
import { auth } from "../authentication/auth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



//signup route
export const signup =async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const normalizedEmail = email.toLowerCase();
      if (!name || !email || !password) {
        return res.status(400).json({ error: "Please fill all the fields" });
      }
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ error: "Sorry email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await User.create({
        name,
        email: normalizedEmail,
        password: hashedPassword,
      });
  
      const token = jwt.sign(
        { email: newUser.email, id: newUser._id },
        process.env.SECRET
      );
  
      console.log("user created successfully");
      return res.status(200).json({ token, id: newUser._id });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Internal server error Try agaian later");
    }
  }

//login route
export const login =  async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Please provide both email and password" });
      }
  
      const verifyUser = await User.findOne({ email });
      if (!verifyUser) {
        return res.status(400).json({ error: "User not found" });
      }
  
      const isMatch = await bcrypt.compare(password, verifyUser.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid password" });
      }
  
      const token = jwt.sign(
        {
          email: verifyUser.email,
          id: verifyUser._id,
        },
        process.env.SECRET
      );
  
      return res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Internal server error. Try again later.");
    }
  }  