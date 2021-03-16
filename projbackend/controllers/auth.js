const User = require("../models/user");
const jwt = require('jsonwebtoken');


exports.signout = (req, res) => {
    res.json({
        "message": "Signout"
    });
}


exports.signin = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err)
            return res.status(400).json({
                error: "User email does not exits"
            });
        else {
            if (user == null) {
                res.status(400).json({
                    error: "No User found"
                });
            }
            else {
                if (user.password === password) {
                    const token = jwt.sign({ _id: user._id }, "shhhh")
                    res.cookie("token", token, { expire: new Date() + 9999 });
                    const { _id, name, email, role } = user;
                    return res.json({ token, user: { _id, name, email, role } })
                }
                else {
                    res.status(400).json({
                        error: "Password doen't match"
                    });
                }
            }
        }
    })

}



exports.signup = (req, res) => {
    console.log(req.body);
    const user = new User(req.body);
    user.save((err, user) => {
        if (err)
            return res.status(400).json({
                err: "Not Able to save user"
            });
        else
            res.json({
                name: user.name,
                email: user.email,
                id: user._id
            });
    });
}