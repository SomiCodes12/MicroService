import cors from "cors";
import express, { Application  , Request, Response} from "express"
import store from "./Router/storeRouter";

const port : number = 2468;
const app : Application = express();

app
.set("view_engine" , "ejs")
.use(cors())
.use(express.json())

.use("/api/v1" , store)

app.get("/" , (req : Request , res : Response) => {
    try {
        return res.status(200).json({
            message : "Welcome"
        })
    } catch (error) {
        return res.status(400).json({
            message : "Error"
        })
    }
})

const server = app.listen(port , () => {
    console.log("")
    console.log("Store Service Connected");
})