import { CheckAssertion } from '../model/Assertion.model.js';
import { CheckAuthentication } from '../model/authentication.model.js';
import { Check } from '../model/check.model.js';

export const getAllChecks = async (req, res) => {
    const { user } = req;
    const checks = await user.getChecks({
        include: [
            {
                model: CheckAssertion,
                attributes: { exclude: ["id", "CheckId"] },
            },
            {
                model: CheckAuthentication,
                attributes: { exclude: ["id", "CheckId"] },
            },
        ],
        attributes: { exclude: ["UserId"] }
    });
    res.json(checks);
}

export const createCheck = async (req, res) => {
    const { user } = req;
    const { name, url, protocol, ignoreSSL, httpHeaders, tages } = req.body;
    try {
        const check = await user.createCheck({ name, url, protocol, ignoreSSL, tages, httpHeaders: JSON.stringify(httpHeaders) });
        if (req.authentication) {
            console.log(req.authentication);
            await check.createAuthentication(req.authentication);
        }
        if (req.assertion) {
            console.log(req.assertion);
            await check.createAssertion(req.assertion);
        }
        const result = await Check.findByPk(check.id, {
            include: [
                { model: CheckAssertion, attributes: { exclude: ["id", "CheckId"] } },
                { model: CheckAuthentication, attributes: { exclude: ["id", "CheckId"] } }], attributes: { exclude: ["UserId"] }
        })
        return res.json(result);

    } catch (error) {
        console.log(error);
        const { name } = error;
        if (name) {

            return res.status(400).json({ message: "you have such service before" });
        }
        return res.status(500).json(error);
    }
}