import users from "../models/user.js";
import bcrypt from "bcrypt";


export const registration = async (req, res) => {
    try {

        const { username, email, password, contact } = req.body;

        const checkContact = await users.findOne({ email }).exec();

        if (checkContact) return res.status(400).json({ status: 400, success: false, message: "This Email is Already Have an Account" });

        const hashpassword = await bcrypt.hash(password, 10);

        const newUser = users({
            username, email, contact,
            password: hashpassword
        });

        await newUser.save();
console.log(newUser,"newUser")
        return res.status(201).json({ status: 201, success: true, message: "You Have Registered Successfully." });
    } catch (error) {
        return res.status(500).json({ status: 500, success: false, message: "Internal Server Error Occured in controller." });
    }
}



export const login = async (req, res) => {
    try {
        const { email } = req.body;
        const existUser = await users.findOne({ email }).exec();
        if (!existUser) return res.status(404).json({ status: 404, success: false, message: "User not found." });

        return res.status(200).json({ status: 200, success: true, message: "Logged in successfully." });
    } catch (error) {
        return res.status(500).json({ status: 500, success: false, message: "Internal server error." });
    }
}



export const updateUser = async (req, res) => {
    try {
        const {_id,email,password,username,contact} = req.body; 

        const response = await users.findOneAndUpdate({_id},{email,username,password,contact}).exec();
console.log(response,"response")
        return res.send("working")
    } catch (error) {

    }
}