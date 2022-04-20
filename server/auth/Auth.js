require('dotenv').config();
const jwt= require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;
const User = require("../models/users");
const bcrypt = require('bcryptjs');
//create
exports.register = async (req, res, next) => {
    
    //hash passwords
  const { username, password } = req.body;
  if (password.length < 6) {
    return res.status(400).json({ message: "Password less than 6 characters" });
  }
  try {
    bcrypt.hash(password, 10).then(async (hash) => {
        await User.create({
          username,
          password: hash,
        })
          .then((user) =>{
              const maxAge = 3*60*60;
              const token = jwt.sign(
                  {
                      id:user_id,
                      username,
                      role:user.role,
                      jwtSecret,
                  },
                  {
                      expiresIn:maxAge,
                  }
              );
              res.cookie('jwt',token,{
                httpOnly:true,
                maxAge:maxAge*1000,
              });
            res.status(200).json({
              message: "User successfully created",
               user:user._id,
            })}
          )
          .catch((error) =>
            res.status(400).json({
              message: "User not successful created",
              error: error.message,
            })
          );
      });
  } catch (err) {
    res.status(401).json({
      message: "User not successful created",
      error: error.mesage,
    });
  }
};
// ________________________________________________________________________________________________________________________________
// login
exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  //check if username is provided

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "username or password not present" });
  }
  try {
    const user = await User.findOne({ username })
    if (!user) {
      res.status(400).json({
        message: "Login not successful",
        error: "User not found",
      })
    } else {
      // comparing given password with hashed password
      bcrypt.compare(password, user.password).then(function (result) {
        if(result){
            const maxAge=3*60*60;
            const token=jwt.sign({
                id:user.z_id,
                username,
                role:user.role,
                jwtSecret,
            },{
                expiresIn:maxAge,
            });
            res.cookie("jwt",token,{
                httpOnly:true,
                maxAge:maxAge*1000,
            })
              res.status(200).json({
              message: "Login successful",
              user:user._id,
            })}
          else{
              res.status(400).json({ message: "Login not succesful" 
            }
            )}
         
      })
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    })
  }
};
// _________________________________________________________________________________________________________________
//update
exports.update = async (req, res, next) => {
  const { role, id } = req.body;
  // verify if role and id are present
  if (role && id) {
    if (role === "admin") {
      await User.findById(id).then((user) => {
        // verifies the user is not admin
        if (user.role !== "admin") {
          user.role = role;
          user.save((err) => {
            if (err) {
              res
                .status("400")
                .json({ message: "an error occurred", error: err.message });
              process.exit(1);
            }
            res.status("201").json({ message: "update successful", user });
          });
        }
        else {
            res.status(400).json({
                message:"user is already an admin", error
            });
        }
      })
      .catch((error)=>{
          res
          .status(400)
          .json({
              mesage:"an error occurred",
              error:error.message,
          })
      })
    } else {
      res
        .status(400)
        .json({ message: "role is not admin", error: "access denied" });
    }
  } else {
    res.status(400).json({ message: "Role or Id not present" });
  }
};
// ________________________________________________________________________________________________________________________________
//delete 
exports.deleteUser = async(req,res,next)=>{
    const { id } = req.body;
    await User.findById(id)
    .then(user=>user.remove())
    .then(user=> 
        res.status(201).json({ message: "User successfully deleted",user}))
        .catch(err=> res.status(400).json({ message:"an error occurred",err: err.message}))
}