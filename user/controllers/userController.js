import randomBytes from 'randombytes';
import jwt from 'jsonwebtoken'
import { User } from '../model/user.model.js';
import { sendVerificationEmail } from '../../utils/sendEmail.js';

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({ name, email, password });
        const token = await user.createToken({ token: randomBytes(6).toString("hex"), user_id: user.id })
        sendVerificationEmail(user, token.token);
        res.json({ name: user.name, email: user.email });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: "Something went wrong" });

    }

}

export const verify = async (req, res) => {
    const { id, token } = req.params;
    const user = await User.findByPk(id);
    const user_token = await user.getToken();
    if (user_token.token === token) {
        user.isVerified = true;
        await user.save();
        user_token.destroy();
        res.status(200).json({ message: "account verified successfully" })
    }
    else {
        res.status(400).json({ message: "there something went wrong" })
    }
}


export const signin = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (user.password === password) {
        return res.status(200).json({
            token: jwt.sign(user.id, "SECRET")
        })
    }
    else{
        res.status(404).json({ message:"creditential failed" });
    }
}