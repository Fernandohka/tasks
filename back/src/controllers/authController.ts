import { Request, Response } from "express";
import User from "../models/user.ts";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";
import dotenv from "dotenv";

dotenv.config();

class AuthController {
    static async register(req: Request, res: Response): Promise<any> {
        
        const { name, email, password } = req.body;
        
        const passwordCrypt = CryptoJS.AES.encrypt(password, process.env.SECRET as string).toString()

        const user = new User({
            name,
            email,
            password: passwordCrypt,
        });


        try {
            await user.save();
            return res.status(201).send({ message: "Usuário cadastrado com sucesso" });
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Something failed" });
        }
    }

    static async login(req: Request, res: Response): Promise<any> {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
 
        if(!user)
            return res.status(400).send({ message: "Invalid Email or password" });
        
        var bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET as string);
        const passwordDecripted = bytes.toString(CryptoJS.enc.Utf8);

        if(password !== passwordDecripted) {
            throw new Error("Usuario e/ou senha invalido ");
        }

        var secret = process.env.SECRET;
        if(!secret)
            secret = ""

        const token = jwt.sign (
            {
                id: user._id
            },
            secret as string,
            {
                expiresIn: '2 days'
            }
        );

        return res.status(200).send({token: token})
    }
}

export default AuthController;