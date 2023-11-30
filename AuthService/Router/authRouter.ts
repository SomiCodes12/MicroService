import {Router} from "express"
import { createUser, findAllUser, findUser, signInUser, verifyUser } from "../Controller/authController"
import validatorHolder from "../Utils/validatorHolder"
import { createAccount, signInAccount } from "../Utils/validator"

const router = Router()

router.route("/create-account").post(validatorHolder(createAccount),createUser)
router.route("/:userID/verify-account").get(verifyUser)
router.route("/:userID/user").get(findUser)
router.route("/users").get(findAllUser)
router.route("/sign-in-account").post(validatorHolder(signInAccount),signInUser)

export default router;