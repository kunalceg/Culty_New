const DBMODEL2 = require("../database/db.js").DBMODEL2;

exports.cultyvateffogetcarouseldetails = async (request, response, next) => {
  let clientModel = request.body;
  console.log(" Get Carousel details ");
  try {
    authresult = await DBMODEL2.dbgetcarouseldetails(clientModel);

    var imageListArray = authresult.imageList;
    console.log(imageListArray);
    if (authresult.status == "Success") {
      response.status(200).json({
        status: "Success",
        imageList: imageListArray,
      });
    } else {
      response.status(200).json({
        status: "Error",
        Message: "Already Registerd",
        imageList: authresult.carouselImageList,
      });
    }
  } catch (err) {
    response.status(200).json({
      status: "Error",
      message: `Error: Unable to Validate Phone number`,
      imageList: authresult.carouselImageList,
      details: err.message,
    });
  }
};
