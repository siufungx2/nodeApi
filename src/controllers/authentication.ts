import express from "express";
import { getUserByEmail, createUser } from "@/db/users";
import { authentication, random } from "@/helpers";

export const register = async(req: express.Request, res:express.Response) => {
    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username)
        {
            return res.status(400).json({message: "Params Missed"});
        }

        const exisitingUser = await getUserByEmail(email);
        if (exisitingUser)
        {
            return res.status(400).json({message: "Email exist"});
        }

        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password)
            }
        })
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}