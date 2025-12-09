import { Router } from "express";
import { createUser, loginUser, getUsers, updateUser, deleteUser } from "../controllers/userController";

const router = Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/", getUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
