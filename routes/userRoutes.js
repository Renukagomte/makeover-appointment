const { readUsers, readSingleUsers, register, continueWithGoogle, handleAccount, updateUser, deleteUser, destroyUser, login, searchUser } = require("../controller/userController")

const router = require("express").Router()

router
    .get("/", readUsers)
    .post("/register", register)
    .post("/login", login)
    .post("/continue-with-google", continueWithGoogle)
    .put("/account/:id", handleAccount)
    .put("/update/:id", updateUser)
    .delete("/destroy", destroyUser)
    .delete("/delete/:id", deleteUser)
    .post("/search", searchUser)
    .get("/:id", readSingleUsers)


module.exports = router