import {Router} from "express"
import { createProduct, viewOneProduct, viewProducts } from "../Controller/storeController"
import { verified } from "../Utils/verify"

const router = Router()

router.route("/create-product").post(verified,createProduct)
router.route("/view-products").post(viewProducts)
router.route("/view-one-product").post(viewOneProduct)

export default router;

