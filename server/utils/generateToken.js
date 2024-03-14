const jwt = require("jsonwebtoken");
const generate = (userId,res) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: "5d",
    });
    console.log("token created")
   res.cookie('jwt', token, {
        maxAge: 10*24*60*60*1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
    });
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

};
module.exports = generate;