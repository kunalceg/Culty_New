const { sql } = require("googleapis/build/src/apis/sql");
const DB = require("mssql");
const { clear } = require("winston");
var db_config = require("../config/db.config.json");

//const comp = require("../controllers/login.controller");
const config = {
  user: db_config.user,
  password: db_config.password,
  server: db_config.server,
  database: db_config.database,
  options: {
    encrypt: db_config.options["encrypt"],
    enableArithAbort: db_config.options["enableArithAbort"],
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 70000,
    acquireTimeoutMillis: 40000,
    reapIntervalMillis: 1000,
  },
};

DB.on("error", (err) => {
  console.log("MSSQL exception raised ");
});

const poolPromise = new DB.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("Connected to MSSQL");
    return pool;
  })
  .catch((err) =>
    console.log("Database Connection Failed! Bad Config: " + err)
  );

//Login api

exports.dblogin = async function (clientModel,otp){
  let pool = await poolPromise;
  let selectReq = await pool.request();
  let insertreq1 = await pool.request();
  let selectReq1 = await pool.request();
  let selectReq2 = await pool.request();
  let selectReq3 = await pool.request();
  
    let resp = await selectReq
		 .input("mobilePhoneNumber", DB.VarChar, clientModel.loginotp.mobilePhoneNumber)
        .query(`select *from loginotp where mobilePhoneNumber = @mobilePhoneNumber`);
        
        if (resp.recordset.length== 0) {
        //insertion
          let resp1= await insertreq1
          .input("mobilePhoneNumber",DB.VarChar,clientModel.loginotp.mobilePhoneNumber)
          .input("otp",DB.Int,otp)
          .input("datetime",DB.Int,clientModel.loginotp.datetime)
          .query(`Insert into loginotp values(@mobilePhoneNumber,@otp,GETDATE()) `)
          console.log("input data : " + JSON.stringify(clientModel));
            return {
            status: "Success",
            Message: "input data"
               }
              } // update  
        else
        {
          let resp2= await selectReq1
          .input("mobilePhoneNumber", DB.VarChar, clientModel.loginotp.mobilePhoneNumber)
          .input("otp",DB.Int,otp)
          .input("datetime",DB.DateTime,clientModel.loginotp.datetime)
          .query(`update loginotp set otp= @otp, datetime=GETDATE() where mobilePhoneNumber=@mobilePhoneNumber `)
          console.log("updated data : " + JSON.stringify(clientModel));
          return {
          status: "Success",
          Message: "updated data"
             }
         }   
         
}

//otp verification
exports.dbverify = async function (clientModel){
  let pool = await poolPromise;
  let selectReq = await pool.request();
  let selectReq1 = await pool.request();
  let resp2 = await selectReq
     .input("mobilePhoneNumber", DB.VarChar, clientModel.loginotp.mobilePhoneNumber)
     .input("otp",DB.Int, clientModel.loginotp.otp)
     .query(`select *from loginotp where mobilePhoneNumber = @mobilePhoneNumber and otp = @otp `);
      console.log(resp2.recordset);
         
    if(resp2.recordset.length > 0){
          let resp3 = await selectReq1
         .input("mobilePhoneNumber", DB.VarChar, clientModel.loginotp.mobilePhoneNumber)
         .input("otp",DB.Int, clientModel.loginotp.otp)
         .query(`SELECT DATEDIFF(second, datetime , GETDATE()) as Sec FROM loginotp 
               where mobilePhoneNumber= @mobilePhoneNumber and otp=@otp`);
               console.log(resp3.recordset[0]);
                 
                let temp =resp3.recordset[0]
                var value = temp.Sec
                   if(value > 30) 
                  {
                    return {
                              status: "Error",
                              message: "Time Expire"
                            }
                  }    
                    else{
                      return{
                      status: "Success",
                      message: "Login Successfully"
                  }
                }
    }
     else{
            return {
                status: "Error",
                message: "Check OTP"
               }
           }
}


// Myfarm api

exports.dbMyfarm = async function (clientModel) {
  let pool = await poolPromise;
  let insertreq1 = await pool.request();
  let selectReq1 = await pool.request();
  
  let pullrecord1 = await selectReq1
   .input("mobilePhoneNumber",DB.VarChar,clientModel.users.mobilePhoneNumber)
   .query("Select farmerProfile , username from users where mobilePhoneNumber=@mobilePhoneNumber");

   console.log(pullrecord1.recordset[0])

   let result = {
     "farmerprofile" : pullrecord1.recordset[0]
   };
 return {
   status: "Success",
   Message: "Data Pulled",
   data:result
 };
}


// farmlandinfo

exports.dbfarmers = async function (clientModel){
  let pool = await poolPromise;
  let selectReq3 = await pool.request();
  let pullrecord1 = await selectReq3
  .input("_id", DB.VarChar, clientModel.farmers._id)
  .query(`select farmlands from farmers where _id=@_id `);
   console.log(pullrecord1.recordset)
   let result = {
  "LandDetails" : pullrecord1.recordset
     };
   return {
     status: "Success",
     Message: "Data Pulled",
     data:result
      };
}

 //block

exports.dbblock = async function (clientModel){
  let pool = await poolPromise;
  let selectReq3 = await pool.request();
  let pullrecord1 = await selectReq3
  		.input("_id", DB.VarChar, clientModel.farmlands._id)
        .query(`select *from farmlands where _id=@_id `);
        console.log(pullrecord1.recordset[0])

        let result = {
          "BLOCK AND PLOT DETAILS" : pullrecord1.recordset[0]
        };
      return {
        status: "Success",
        Message: "Data Pulled",
        data:result
      };
}


//deviceassociation

exports.dbdeviceassociation = async function (clientModel){
  let pool = await poolPromise;
  let selectReq1 = await pool.request();
  let pullrecord1 = await selectReq1
  		.input("farmland", DB.VarChar, clientModel.deviceassociations.farmland)
        .query(`select devId from deviceassociations where farmland=@farmland `);
        console.log(pullrecord1.recordset)

        let result = {
          "deviceassociation Data" : pullrecord1.recordset
        };
      return {
        status: "Success",
        Message: "Data Pulled",
        data:result
      };
}

//telemetrydata   

exports.dbtelemetrydata = async function (clientModel){
  let pool = await poolPromise;
  let selectReq1 = await pool.request();
  let pullrecord1 = await selectReq1
  		.input("devId", DB.VarChar, clientModel.telemetrydata.devId)
      .query(`select MAX(date_time) from telemetrydata where devId=@devId`);
      console.log(pullrecord1.recordset)

      /*  .query(`select soil_moisture,raw_payload_fields_Water_Flow_Tick_Count,
        raw_payload_fields_Operating_Mode,wftc_in_liters 
         from telemetrydata where devId=@devId `);
        console.log(pullrecord1.recordset)*/

        let result = {
          "Field Obsevation" : pullrecord1.recordset
        };
      return {
        status: "Success",
        Message: "Data Pulled",
        data:result
      };
}

