const DBMODEL = require("../database/db.js").DBMODEL2;

exports.telemetrydata = async (request, response, next) => {
  let clientModel = request.body
  console.log(" Sending User Info ");
  try {
    saveresult = await DBMODEL.dbtelemetrydata (clientModel);

    if (saveresult.status == "Success") {
      response.status(200).json({
        status: "Success",
        telemetrydata : saveresult.data
      });
    } else {
      response.status(200).json({
        status: "Error",
        Message: "Sorry unable to fetch",
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
