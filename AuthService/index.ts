import express, { Application  , Request , Response} from "express"
import auth from "./Router/authRouter";
import { myConnection } from "./Utils/connection";

const app : Application = express();

const port : number = 1234;

app.set("view_engine" , "ejs")

app.use(express.json())

app.use("/api/v1" , auth)

app.get ("/" , (req : Request , res : Response) => {
    try {
        return res.status(200).json({
            message : "Awesome"
        })
    } catch (error) {
        return res.status(400).json({
            message : "Error"
        })
    }
})

myConnection("product")

export const server = app.listen(port , () => {
    console.log("Auth Service Connected");
})