import {Request , Response ,  NextFunction } from "express";
import jwt from "jsonwebtoken"

export const verified = async (req : any , res : Response , next : NextFunction) => {
try {
    const token = req.headers.authorization;
    if (token) {
        const realToken = token.split(" ")[1];
        if (realToken) {
            jwt.verify(realToken , "secret" , async (err , payload : any) => {
                if (err) {
                    return res.status(400).json({
                        message : "Error Verifying User"
                    })
                } else {
                    req.user = payload;
                    next()
                }
            })
        } else {
            return res.status(400).json({
                message : "There's sth wrong with your token"
            })
        }
    } else {
        return res.status(400).json({
            message : "You ain't authorised"
        })
    }
} catch (error) {
    return res.status(400).json({
        message : "Error Verifying User"
    })
}
}