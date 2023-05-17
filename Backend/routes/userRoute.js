const express = require("express");

const userController = require("../controller/userController");

const router = express.Router();

router.get("/getUsers", userController.getUsers);

router.post("/postUser", userController.postUser);

router.get("/getEditUser/:userId", userController.getEditUser);

router.put("/updateUser/:userId", userController.postEditUser);

router.delete("/deleteUser/:userId", userController.getDeleteUser);

module.exports = router;