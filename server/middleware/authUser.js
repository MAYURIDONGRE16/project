import jwt from "jsonwebtoken";

const authuser = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.json({ success: false, message: "Not Authorized" });
    }
    try {
        const tokendecode = jwt.verify(token, process.env.JWT_SECRET);
        if (tokendecode.id) {
            // req.user = tokendecode.id; // Store userID in req.user
            // req.user = { _id: tokendecode.id };
            req.user = req.userId = tokendecode.id;

        } else {
            return res.json({ success: false, message: "Not Authorized" });
        }
        next();
    } catch (error) {
        console.log(error.message);
        return res.json({ success: false, message: "Not Authorized" });
    }
};

export default authuser;

