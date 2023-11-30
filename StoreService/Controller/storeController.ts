import {Request , Response} from "express"
import {PrismaClient} from "@prisma/client"
import { myConnection } from "../Utils/connection";

const prisma = new PrismaClient()

export const createProduct = async (req : any , res : Response) => {
    try {
        const {title , description , price} = req.body;

        const { id } = req.user

        const product = await prisma.storeModel.create({
            data : {
                title,
                description,
                price,
                userID : id
            }
        });

        myConnection("product", product)

        console.log(product)

        return res.status(200).json({
            message : "Created Product Successfully",
            data : product
        })
    } catch (error) {
        return res.status(400).json({
            message : "Error Creating Product"
        })
    }
}

export const viewProducts = async (req : Request , res : Response) => {
    try {
        const product = await prisma.storeModel.findMany({})
        return res.status(200).json({
            message : "Found Products Successfully",
            data : product
        })
    } catch (error) {
        return res.status(400).json({
            message : "Error Finding Products"
        })
    }
}

export const viewOneProduct = async (req : Request , res : Response) => {
    try {
        const {productID} = req.params
        const product = await prisma.storeModel.findUnique({
            where : {id : productID}
        })
        return res.status(200).json({
            message : "Found One Product Successfully",
            data : product
        })
    } catch (error) {
        return res.status(400).json({
            message : "Error Finding One Product"
        })
    }
}