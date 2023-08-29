import {User} from '../model/user.model.js';

export const firstNameExist = (req, res, next) => {
    const { name } = req.body;
    if (name) {
        next();
    }
    else {
        res.status(400).json({ message: "name is mandatory attribute to complete sign up request" });
    }
}
export const emailExist = (req, res, next) => {
    const { email } = req.body;
    if (email) {
        next();
    }
    else {
        res.status(400).json({ message: "email is mandatory attribute to complete sign up request" });
    }
}
export const passwordExist = (req, res, next) => {
    const { password } = req.body;
    if (password) {
        next();
    }
    else {
        res.status(400).json({ message: "password is mandatory attribute to complete sign up request" });
    }
}
export const isEmailDublicate = async (req, res, next) => {
    const { email } = req.body;
    const susUser = await User.findOne({where:{email}});
    if(susUser) {
        return res.status(400).json({ message: "there is a user with the same email exit"});
    }
    else{
        next();
    }
}