const DBMODEL = require("../database/db.js").DBMODEL2;

exports.cultyvatelogin = async (request, response, next) => {
  let clientModel = request.body
  let otp = Math.random();
  otp = otp * 10000;
  otp = parseInt(otp);
 console.log("OTP :" +otp);  

    try {
    saveresult = await DBMODEL.dblogin (clientModel,otp);

    if (saveresult.status == "Success") {
      response.status(200).json({
        status: "Success",
        infodata : saveresult.data
      });
    } 
  } catch (err) {
    response.status(200).json({
      status: "Error",
      message: `Error: Unable to save user info Details`,
      details: err.message,
    });
  }
};