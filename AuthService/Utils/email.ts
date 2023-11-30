import nodemailer from "nodemailer"
import {google} from "googleapis"
import path from "path"
import  ejs from "ejs"

const GOOGLEID = "347489271632-vcd7j2uphrrgnrtn6un41emrhids3k2e.apps.googleusercontent.com"
const GOOGLESECRET = "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"
const GOOGLE_REFRESHTOKEN = "1//04vrS0Rqzc4PGCgYIARAAGAQSNwF-L9IrPbosV7yrN31bMIEZkcrQHwdJE_USD5jEavY0uQiM0QfYpq5R4OAEc9W3svTQLJJaTA4"
const GOOGLE_URL = ""

const oAuth = new google.auth.OAuth2(GOOGLEID , GOOGLESECRET , GOOGLE_URL)
oAuth.setCredentials({refresh_token : GOOGLE_REFRESHTOKEN})

export const openingMail = async (user : any) => {
    try {
        const accessToken : any = (await (oAuth.getAccessToken())).token

        const transport = nodemailer.createTransport({
            service : "gmail",
            auth : {
                type : "OAuth2",
                user : "somtochukwue98@gmail.com",
                clientId : GOOGLEID,
                clientSecret : GOOGLESECRET,
                refreshToken : GOOGLE_REFRESHTOKEN,
                accessToken
            }
        });

        const dataPath = path.join(__dirname , "../Views/openingMail.ejs");
        const data = await ejs.renderFile(dataPath)

        const mailer = {
            from : "somtochukwue98@gmail.com",
            to : user.id,
            subject : "Do Hard Things",
            html : data
        };
        transport.sendMail(mailer);
    } catch (error) {
        console.log(error);
    }
}