import express from "express";
import * as userController from "../controllers/user";

const router = express.Router();

router.get("/", userController.getUsers);
router.post("/signup", userController.signup);
router.post("/login", userController.login);
// Protected routes
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
