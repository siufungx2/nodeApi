import express from "express";
import { getUserByEmail, createUser } from "@/db/users";
import { authentication, random } from "@/helpers";

export const login = async(req: express.Request, res:express.Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
        {
            return res.status(400).json({message: "Email or password incorrect"});
        }
        
        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

        if (!user)
        {
            return res.status(400).json({message: "Email or password incorrect"});
        }

        const expectedHash = authentication(user.authentication.salt, password);
        if (user.authentication.password !== expectedHash)
        {
            return res.status(403).json({message: "Email or password incorrect"});
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());
        await user.save();
        res.cookie(`${process.env.APP_NAME}-AUTH`, user.authentication.sessionToken, {domain: process.env.APP_URL, path: '/'});
        return res.status(200).json(user).end();
    } catch (error ) {
        console.log(error);
        return res.sendStatus(400);
    }
};

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