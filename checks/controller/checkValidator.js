const checkNotNullAttributes = ["name", "url", "protocol", "ignoreSSL"];

export const notNullValidator = checkNotNullAttributes.map((attr) => {
    return (req, res, next) => {
        const value = req.body[attr];
        if (value) {
            next();
        }
        else {
            res.status(400).json({ message: attr + " is mandatory attribute to complete sign up request" });
        }
    }
})

export const authenticationValidator = (req, res, next) => {
    const { authentication } = req.body;
    if (authentication) {
        const { username, password } = authentication;
        if (username && password) {
            req.authentication = authentication;
            return next();
        }
        else {
            return res.status(400).json({ message: " username and password are mandatory attribute to complete sign up request" });
        }
    }
    next();
}
export const assertionValidator = (req, res, next) => {
    const { assertion } = req.body;
    if (assertion) {
        const { statusCode } = assertion;
        if ( statusCode) {
            req.assertion = assertion;
            return next();
        }
        else {
            return res.status(400).json({ message: " username and password are mandatory attribute to complete sign up request" });
        }
    }
    next();
}