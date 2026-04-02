import { Router } from "express";
import { logInUser, registerUser } from "../controller/authentication.controller.js"

const router = Router();

router.post('/register', registerUser);
router.post('/login', logInUser) //login
export default router;