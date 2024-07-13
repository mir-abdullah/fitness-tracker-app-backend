import express from "express";
import { signup,login } from "../controllers/user.js";


const router = express.Router();

//route to signup


router.post("/signup", signup);

//route to login user

router.post("/login",login);

export default router;
