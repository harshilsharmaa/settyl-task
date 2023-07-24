const User = require('../models/User');

exports.register = async(req,res)=>{

    try {

        const {name, email, password} = req.body;

        if(!name ||  !email || !password) {
            return res.status(400).json({
                message: "name, password and email required",
                success: false
            })
        }

        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({
                message: "User already exists",
                success: false
            })
        }

        user = await User.create({
            name,
            email,
            password,
        });


        const token = await user.generateToken();

        const options = {
            expiresIn: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true
        };

        res.status(200)
        .cookie("token", token, options)
        .json({
            message: "User Successfully registered",
            user,
            success: true,
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error,
            success: false
        })
    }
}

exports.profile = async(req,res)=>{
    try {

        res.status(200).json({
            success: true,
            message: "Test Profile"
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message: "Internal Server Error"
        })
    }
}