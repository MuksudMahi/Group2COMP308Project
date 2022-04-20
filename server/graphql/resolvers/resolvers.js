let mongoose = require("mongoose");
let User = mongoose.model("User");
let ClinicalVisit = mongoose.model("ClinicalVisit");

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");
let passport = require("passport");
//const { token } = require("morgan");
let keys = require("../../helpers/keys");
let varify = require("../../helpers/jwt");
module.exports = {
  //User
  user: async ({ userId }, req) => {
    if (!req.isAuth) {
      //throw new Error("Unauthorized");
      console.log("Unauthorized");
    }
    const userInfo = await User.findById(userId).exec();
    console.log(userInfo);
    if (!userInfo) {
      //throw new Error("Error");
      console.log("Error");
    }
    return userInfo;
  },
  createUser: async ({ username, password, role }) => {
    try {
      console.log("here");
      let userToSave = new User({
        username: username,
        password: password,
        role: role,
      });
      userToSave.password = userToSave.generateHash(userToSave.password);
      await userToSave.save();
      return { message: "User Created", status: "Ok" };
    } catch (err) {
      return { message: err.message, status: "Failed" };
    }
  },
  login: async ({ username, password }) => {
    try {
      console.log(username, password);
      const user = await User.findOne({ username });
      console.log(user);
      if (!user) {
        throw new Error("Invalid Credentials!user");
      }

      if (!user.validPassword(password)) {
        throw new Error("Invalid Credentials!password");
      }
      const token = jwt.sign(
        { _id: user._id, username: user.username },
        keys.private_key,
        {
          algorithm: "RS256",
          expiresIn: "1h",
        }
      );
      //console.log(req.isAuth);
      console.log("Before return");
      return { token, id: user._id ,role:user.role};
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  findUserByRole: async ({ role}) => {
    try 
    {
      const user = User.find({ role });
      console.log(user);
      return user;
    }
    catch (err) 
    {
      return { message: err.message, status: "Failed" };
    }
  },
  createClinicalVisit: async ({ bodyTemperature,heartRate, bloodPressure, respiratoryRate,nurse,patient}) => {
    try {
      console.log("here");
      let clinicalVisitToSave = new ClinicalVisit({
        bodyTemperature: bodyTemperature,
        heartRate: heartRate,
        bloodPressure: bloodPressure,
        respiratoryRate: respiratoryRate,
        nurse: nurse,
        patient, patient
      });
      await clinicalVisitToSave.save();
      return { message: "Clinical Visit Created", status: "Ok" };
    } catch (err) {
      return { message: err.message, status: "Failed" };
    }
  },
  findClinicalVisitsByNurse: async ({nurse}) => {
    try 
    {
      const clinicalVisit = ClinicalVisit.find({ nurse });
      console.log(clinicalVisit);
      return clinicalVisit;
    }
    catch (err) 
    {
      return { message: err.message, status: "Failed" };
    }
  },
};
