// Format of Token
// Authorization: Bearer <access_token>
const tokenValidator = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        // split at the space
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;

        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }
}

module.exports = tokenValidator