import express from "express";
import * as userController from "../controllers/user";

const router = express.Router();

router.get("/", userController.getUsers);
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.post("/logout", userController.logout);

export default router;
