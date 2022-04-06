const DBMODEL = require("../database/db.js").DBMODEL2;

exports.cultyvateverify = async (request, response, next) => {
  let clientModel = request.body
  console.log(" Save User Info ");
    try {
    saveresult = await DBMODEL.dbverify (clientModel);

    if (saveresult.status == "Success") {
      response.status(200).json({
        status: "Success",
        message: "Login Successfully"
      });
    }
    else {
      response.status(200).json({
        status: "Error",
        message: "Check OTP or Time Expire"
      });
    }
  } 
  catch (err) {
    response.status(200).json({
      status: "Error",
      message: `Error: Unable to save user info Details`,
      details: err.message,
    });
  }
};