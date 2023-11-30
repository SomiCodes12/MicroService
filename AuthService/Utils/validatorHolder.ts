import {Request , Response , NextFunction } from "express"
import joi from "joi"

export default (Schema : joi.ObjectSchema<any>) => {
    return (req : Request , res : Response , next : NextFunction) => {
        const {error} = Schema.validate(req.body)
        if (error) {
            return res.status(400).json({
                message : "Validation Error",
                data : error
            })
        } else {
            next()
        }
    }
}