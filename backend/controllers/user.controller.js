const User = require('../models/User');

exports.register = async(req,res)=>{

    try {

        const {name, email, password} = req.body;

        if(!name ||  !email || !password) {
            return res.status(400).json({
                error: "name, password and email required",
                success: false
            })
        }

        let user = await User.findOne({email});

        if(user){
            return res.status(400).json({
                error: "User already exists",
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
            error: error,
            success: false
        })
    }
}

exports.login = async(req,res)=>{
    try {

        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({
                error: "password and email required",
                success: false
            })
        }

        const user = await  User.findOne({email}).populate('tasks')

        if(!user){
            return res.status(400).json({
                error: "User does not exist",
                success: false
            })
        }

        const isMatch = await user.matchPassword(password);

        if(!isMatch){
            return res.status(400).json({
                error: "Incorrect password",
                success: false
            })
        }

        const token = await user.generateToken();

        const options = {
            expiresIn: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true
        };

        res.status(200)
        .cookie("token", token, options)
        .json({
            message: "Login successful",
            user,
            success: true,
        })


        
    } catch (error) {
        res.status(500).json({
            error: error.message,
            success: false
        })
    }
}

exports.profile = async(req,res)=>{
    try {
        const user = await User.findById(req.user._id).populate({
            path: 'tasks',
            populate: { path: 'assigned_user' },
          });
        res.status(200).json({
            success: true,
            user
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            error:error
        })
    }
}

exports.allUsers = async(req,res)=>{
    try {

        const users = await User.find({});

        res.status(200).json({
            success: true,
            users
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message: "Internal Server Error"
        })
    }
}

exports.logout = async(req,res)=>{
    try {
        
        res.status(200).cookie("token", null, {expires:new Date(Date.now()), httpOnly:true}).json({
            message: "Logout successful",
            success: true
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        })
    }
}