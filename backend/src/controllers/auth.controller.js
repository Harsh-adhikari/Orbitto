// import { generateToken } from "../lib/utils.js";
// import User from "../models/user.model.js";
// import cloudinary from "../lib/cloudinary.js";
// import bcrypt from "bcryptjs";

// export const signup = async (req, res) => {
//   const { fullName, email, password } = req.body;  
//   try {
//     if(!fullName || !email || !password) {  
//         return res.status(400).json({ message: "All fields are required" });
//     }

//     // hash password
//     if (password.length < 6){
//         return res.status(400).json({ message: "Password must be at least 6 characters long" });
//     }

//     const user = await User.findOne({ email });
//     if (user) return res.status(400).json({ message: "Email already exists"})
    
//     // Using bcrypt to hash password
//     const salt = await bcrypt.genSalt(10)
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new User({
//         fullName,
//         email,
//         password: hashedPassword
//     })
    
//     if(newUser){
//         // Generate jwt token here 
//         generateToken(newUser._id, res);
//         await newUser.save();
//         res.status(201).json({
//             _id: newUser._id,
//             fullName: newUser.fullName,
//             email: newUser.email,
//             profilePic: newUser.profilePic,
//             createdAt: newUser.createdAt // ✅ ADDED createdAt
//         })

//     } else{
//         res.status(400).json({ message: "Invalid user data"});
//     }
//   } catch (error) {
//     console.log("Error in signup controller: ", error.message);
//     res.status(500).json({ message: "Internal Server Error"});
//   }
// };

// export const login = async (req, res) => {
//     const {email, password} = req.body;
//   try{
//   const user = await User.findOne({email})
//   if(!user){
//     return res.status(400).json({message:"Invalid credentials"})
//   }
//   const isPasswordCorrect = await bcrypt.compare(password, user.password);
//   if(!isPasswordCorrect){
//     return res.status(400).json({message: "Invalid credentials"});
//   }
//   generateToken(user._id, res); // ✅ FIXED: was user.id, should be user._id
//   res.status(200).json({
//     _id: user._id,
//     fullName: user.fullName,
//     email: user.email,
//     profilePic: user.profilePic,
//     createdAt: user.createdAt // ✅ ADDED createdAt
//   })
// } catch(error){
//    console.log("Error in Login credentials: ", error.message);
//    res.status(500).json({ message: "Internal Server Error"});
//   }
// };

// export const logout = (req, res) => {
//   try{
//     // just clearing the cookie
//     res.cookie("jwt", "", {maxAge:0})
//     res.status(200).json({message: "Logged out successfully"});
//   } catch(error){
//     res.status(500).json({ message: "Internal Server Error"});  
//   }
// };

// export const updateProfile = async(req, res) => {
// try{
// const {profilePic} = req.body;
// const userId = req.user._id;
// if(!profilePic){
//   return res.status(400).json({message: "Profile picture is required"});
// }
// const uploadResponse = await cloudinary.uploader.upload(profilePic);
// const updatedUser = await User.findByIdAndUpdate(
//   userId, 
//   {profilePic: uploadResponse.secure_url}, 
//   {new: true}
// ).select("-password"); // ✅ ADDED: exclude password from response

// // ✅ RETURN COMPLETE USER DATA with all fields
// res.status(200).json({
//   _id: updatedUser._id,
//   fullName: updatedUser.fullName,
//   email: updatedUser.email,
//   profilePic: updatedUser.profilePic,
//   createdAt: updatedUser.createdAt
// });

// }catch(error){
// console.log("Error in updating profile: ", error.message);
// res.status(500).json({ message: "Internal Server Error"});
// }
// }

// // This middleware help to check if user is authenticated when user refresh the page
// export const checkAuth = (req, res) => {
//   try{
//     // ✅ RETURN COMPLETE USER DATA (req.user already has all fields from middleware)
//     res.status(200).json({
//       _id: req.user._id,
//       fullName: req.user.fullName,
//       email: req.user.email,
//       profilePic: req.user.profilePic,
//       createdAt: req.user.createdAt
//     });
//   } catch(error){
//     console.log("Error in checkAuth controller: ", error.message)
//     res.status(500).json({ message: "Internal Server Error"});  
//   }
// }



import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;  
  try {
    if(!fullName || !email || !password) {  
        return res.status(400).json({ message: "All fields are required" });
    }

    // hash password
    if (password.length < 6){
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists"})
    
    // Using bcrypt to hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        fullName,
        email,
        password: hashedPassword
    })
    
    if(newUser){
        // Generate jwt token here 
        generateToken(newUser._id, res);
        await newUser.save();
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic,
            createdAt: newUser.createdAt // ✅ ADDED createdAt
        })

    } else{
        res.status(400).json({ message: "Invalid user data"});
    }
  } catch (error) {
    console.log("Error in signup controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error"});
  }
};

export const login = async (req, res) => {
    const {email, password} = req.body;
  try{
  const user = await User.findOne({email})
  if(!user){
    return res.status(400).json({message:"Invalid credentials"})
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if(!isPasswordCorrect){
    return res.status(400).json({message: "Invalid credentials"});
  }
  generateToken(user._id, res); // ✅ FIXED: was user.id, should be user._id
  res.status(200).json({
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    profilePic: user.profilePic,
    createdAt: user.createdAt // ✅ ADDED createdAt
  })
} catch(error){
   console.log("Error in Login credentials: ", error.message);
   res.status(500).json({ message: "Internal Server Error"});
  }
};

export const logout = (req, res) => {
  try{
    // just clearing the cookie
    res.cookie("jwt", "", {maxAge:0})
    res.status(200).json({message: "Logged out successfully"});
  } catch(error){
    res.status(500).json({ message: "Internal Server Error"});  
  }
};

export const updateProfile = async(req, res) => {
try{
const {profilePic, fullName} = req.body;
const userId = req.user._id;

// Build update object based on what's provided
const updateData = {};

// Handle profile picture update
if(profilePic){
  const uploadResponse = await cloudinary.uploader.upload(profilePic);
  updateData.profilePic = uploadResponse.secure_url;
}

// Handle full name update
if(fullName){
  if(fullName.trim().length < 2){
    return res.status(400).json({message: "Full name must be at least 2 characters"});
  }
  updateData.fullName = fullName.trim();
}

// Check if there's anything to update
if(Object.keys(updateData).length === 0){
  return res.status(400).json({message: "No data provided for update"});
}

const updatedUser = await User.findByIdAndUpdate(
  userId, 
  updateData, 
  {new: true}
).select("-password"); // ✅ ADDED: exclude password from response

// ✅ RETURN COMPLETE USER DATA with all fields
res.status(200).json({
  _id: updatedUser._id,
  fullName: updatedUser.fullName,
  email: updatedUser.email,
  profilePic: updatedUser.profilePic,
  createdAt: updatedUser.createdAt
});

}catch(error){
console.log("Error in updating profile: ", error.message);
res.status(500).json({ message: "Internal Server Error"});
}
}

// This middleware help to check if user is authenticated when user refresh the page
export const checkAuth = (req, res) => {
  try{
    // ✅ RETURN COMPLETE USER DATA (req.user already has all fields from middleware)
    res.status(200).json({
      _id: req.user._id,
      fullName: req.user.fullName,
      email: req.user.email,
      profilePic: req.user.profilePic,
      createdAt: req.user.createdAt
    });
  } catch(error){
    console.log("Error in checkAuth controller: ", error.message)
    res.status(500).json({ message: "Internal Server Error"});  
  }
}





