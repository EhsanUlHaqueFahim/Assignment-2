import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    const file = req.file;
    
    console.log("Registration request:", { fullname, email, phoneNumber, role, hasFile: !!file });

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false
      });
    };

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: 'User already exist with this email.',
        success: false,
      })
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user object with profile photo 
    const userData = {
      fullname,
      email,
      phoneNumber: parseInt(phoneNumber),
      password: hashedPassword,
      role,
    };

    // Add pp if file is uploaded
    if (file) {
      userData.profile = {
        bio: "",
        skills: [],
        resume: "",
        resumeOriginalName: "",
        profilePhoto: `http://localhost:8000/uploads/${file.filename}`,
        profilePhotoOriginalName: file.originalname
      };
    }

    console.log("Creating user with data:", userData);
    await User.create(userData);
    console.log("User created successfully");
    return res.status(201).json({
      message: "Account created successfully.",
      success: true
    });

  } catch (error) {
    console.log("Registration error:", error);
    return res.status(500).json({
      message: error.message || "Internal server error.",
      success: false
    });
  }
}
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false
      });
    };
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      })
    };
    // check role
    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role.",
        success: false
      })
    };

    const tokenData = {
      userId: user._id
    }
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile
    }

    return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
      message: `Welcome back ${user.fullname}`,
      user,
      success: true
    })
  } catch (error) {
    console.log(error);
  }
}
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true
    })
  } catch (error) {
    console.log(error);
  }
}
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.id; 
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false
      })
    }

    const userData = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile
    }

    return res.status(200).json({
      message: "User found.",
      user: userData,
      success: true
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false
    })
  }
}

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    console.log("Files received:", req.files);
    console.log("Body received:", req.body);
    
    const profilePhotoFile = req.files?.profilePhotoFile?.[0];
    const resumeFile = req.files?.resumeFile?.[0];



    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    const userId = req.id; 
    let user = await User.findById(userId);









    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false
      })
    }
    // updating data
    if (fullname) user.fullname = fullname
    if (email) user.email = email
    if (phoneNumber) user.phoneNumber = phoneNumber
    if (bio) user.profile.bio = bio
    if (skills) user.profile.skills = skillsArray
    
    // Update profile photo if file is uploaded
    if (profilePhotoFile) {
      if (!user.profile) user.profile = {};
      const profilePhotoUrl = `http://localhost:8000/uploads/${profilePhotoFile.filename}`;
      console.log('Profile photo URL:', profilePhotoUrl);
      user.profile.profilePhoto = profilePhotoUrl;
      user.profile.profilePhotoOriginalName = profilePhotoFile.originalname;
    }

    // Update resume if file is uploaded
    if (resumeFile) {
      if (!user.profile) user.profile = {};
      const resumeUrl = `http://localhost:8000/uploads/${resumeFile.filename}`;
      console.log('Resume file received:', resumeFile);
      console.log('Resume URL:', resumeUrl);
      console.log('Resume original name:', resumeFile.originalname);
      user.profile.resume = resumeUrl;
      user.profile.resumeOriginalName = resumeFile.originalname;
    } else {
      console.log('No resume file received');
    }




    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile
    }

    return res.status(200).json({
      message: "Profile updated successfully.",
      user,
      success: true
    })
  } catch (error) {
    console.log(error);
  }
}