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
    const { name, url, protocol, ignoreSSL, httpHeaders, tags, path, port, webhook, timeout, interval, threshold } = req.body;
    try {
        const check = await user.createCheck({ name, url, protocol, ignoreSSL, tags, httpHeaders: JSON.stringify(httpHeaders), path, port, webhook, timeout, interval });
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

export const getCheckById = async (req, res) => {
    const { id } = req.params;
    const { user } = req;
    const result = await user.getChecks({
        where: { id }, include: [
            { model: CheckAssertion, attributes: { exclude: ["id", "CheckId"] } },
            { model: CheckAuthentication, attributes: { exclude: ["id", "CheckId"] } }], attributes: { exclude: ["UserId"] }
    })
    return res.json(result[0]);

}
export const deleteCheck = async (req, res) => {
    const { id } = req.params;
    const { user } = req;
    const result = await user.getChecks({
        where: { id }, include: [
            { model: CheckAssertion, attributes: { exclude: ["id", "CheckId"] } },
            { model: CheckAuthentication, attributes: { exclude: ["id", "CheckId"] } }], attributes: { exclude: ["UserId"] }
    })
    await result[0].destroy();
    return res.json({ message: 'success' });

}
export const updateCheck = async (req, res) => {
    const { id } = req.params;
    const { user } = req;
    let result = await user.getChecks({
        where: { id }, include: [
            { model: CheckAssertion, attributes: { exclude: ["id", "CheckId"] } },
            { model: CheckAuthentication, attributes: { exclude: ["id", "CheckId"] } }], attributes: { exclude: ["UserId"] }
    })
    const updateObject = {};
    const toBeSet = Object.keys(req.body).filter(e => (!(['token', 'authentication', 'assertion'].includes(e)) && (Object.keys(result[0].toJSON()).includes(e))));
    toBeSet.forEach((e) => updateObject[e] = req.body[e].toString());
    result[0].set(updateObject)

    const { authentication, assertion } = req.body;
    if (authentication) {
        const { username, password } = authentication;
        const nwq_authentication = await result[0].getAuthentication();
        if (username) {
            nwq_authentication.set({ username });
        }
        if (password) {
            nwq_authentication.set({ password });
        }
        await nwq_authentication.save();
    }
    if (assertion) {
        const { statusCode } = assertion;
        const new_assertion = await result[0].getAssertion();
        if (statusCode) {
            new_assertion.set({ statusCode });
            await new_assertion.save();
        }

    }

    await result[0].save();
    result = await user.getChecks({
        where: { id }, include: [
            { model: CheckAssertion, attributes: { exclude: ["id", "CheckId"] } },
            { model: CheckAuthentication, attributes: { exclude: ["id", "CheckId"] } }], attributes: { exclude: ["UserId"] }
    })
    return res.json(result[0]);

}

