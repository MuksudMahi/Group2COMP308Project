let mongoose = require("mongoose");
let User = mongoose.model("User");
let ClinicalVisit = mongoose.model("ClinicalVisit");
let Alert = mongoose.model("Alert");
let MotivationalTips = mongoose.model("MotivationalTips");
let DailyLog = mongoose.model("DailyLogSchema");

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
        patient: patient
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
  findAlerts: async () => {
    try 
    {
      const alert = Alert.find();
      console.log(alert);
      return alert;
    }
    catch (err) 
    {
      return { message: err.message, status: "Failed" };
    }
  },
  createMotivationalTips: async ({ tip }) => {
    try {
      console.log("here");
      let tips = new MotivationalTips({
        tip: tip
      });
      await tips.save();
      return { message: "Motivational Tip Created", status: "Ok" };
    } catch (err) {
      return { message: err.message, status: "Failed" };
    }
  },
  createEmergencyAlert: async ({patient,message})=>{

    try {
      let alert = new Alert({
        message:message,
        unread:true,
        patient: patient
      });
      await alert.save();
      return { message: "Emergency Alert Created", status: "Ok" };
    } catch (err) {
      return { message: err.message, status: "Failed" };
    }

  },
  findMotivationalTips:()=>{
    try 
    {
      const motivationalTip = MotivationalTips.find();
      console.log(motivationalTip);
      return motivationalTip;
    }
    catch (err) 
    {
      return { message: err.message, status: "Failed" };
    }
  },
  createDailyLog: async ({pulse,bodyTemperature,bloodPressure,respiratoryRate, nurse, patient,weight,temperature})=>{

    try{
      let dailyLog = new DailyLog({
        pulse:pulse,
        bodyTemperature: bodyTemperature,
        bloodPressure: bloodPressure,
        respiratoryRate: respiratoryRate,
        weight:weight,
        temperature:temperature,
        nurse: nurse,
        patient: patient
      });
      await dailyLog.save();
      return { 
        message: "Daily Log Created", status: "Ok" };
      } catch (err) {
        return { message: err.message, status: "Failed" };
      }
  },
};
