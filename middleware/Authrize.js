import jwt from 'jsonwebtoken'
import { User } from '../user/model/user.model.js'
export const authorize = (req, res, next) => {
    const { token } = req.body
    if (!token) {
        return res.status(400).json({ message: "Token field is required" })
    }
    jwt.verify(token, 'SECRET', async function (err, decoded) {
        if (err) {
            return res.status(404).json({ message: "invalid token" })
        }
        else {
            const user = await User.findByPk(decoded);
            if (user) {
                if (user.isVerified) {
                    req.user = user;
                    next();
                } else {

                    return res.status(404).json({ message: "user is not verofied, check email" })

                }
            }
            else
                return res.status(500).json({ message: "there is no such user" })
        }
    });
}