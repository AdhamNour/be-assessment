import jwt from 'jsonwebtoken'
import { User } from '../user/model/user.model.js'
export const authorize = async (req, res, next) => {
    const { token } = req.body
    if (!token) {
        return res.status(400).json({ message: "Token field is required" })
    }
    try {
        const decoded = jwt.verify(token, "SECRET");
        const user = await User.findByPk(decoded);
        if (user) {
            req.user = user;
            return next();
        }
        else
            return res.status(500).json({ message: "there is no such user" })
    } catch (error) {

        return res.status(500).json({ message: "Something went wrong" })
    }

}