const jwt = require("jsonwebtoken")
exports.authProtected = (req, res, next) => {
    if (!req.cookies) {
        return res.status(401).json({
            message: "No Cookie Found"
        })
    }
    const { token } = req.cookies
    if (!token) {
        return res.status(401).json({
            message: "token missing"
        })
    }
    jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
        if (err) {
            return res.status(401).json({
                message: "Invalid token"
            })
        }
        const { id, role } = decode
        if (role === "user") {
            req.body.userId = id
        } else if (role === "artist") {
            req.body.artistId = id
        }
        req.body.role = role
        next()
    })
}