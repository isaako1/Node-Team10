//Call express to be used in this app 
var express = require("express");
var app = express();

//Call PG to be used on this app
const { Pool } = require("pg");

//Call PG to conect to postgres and use dbs locally
// or un Heroku, highly useful 
/***********************************************
 *  This is a template for a local conection and how
 * to create a User on localhost PG
 * "postgres://USER:PASSWORD@localhost:5432/USER"
 * 
 * 

***********************************************/
const connectionString = process.env.DATABASE_URL || "postgres://isaac:student@localhost:5432/familyhistory";

// stablish connection to the data source with connectionString
const pool = new Pool({connectionString: connectionString}); // this is the global point of access


// Set your port locally or in Heroku
app.set("port", (process.env.PORT || 5000));


//app.get lets you set a "Route" to listen and respond
// to the users request (Makes an enpoint)
app.get("/getPerson", getPerson)


//set the listening to the server
app.listen(app.get("port"), function(){
    //console log to debug
console.log("Listening on port: ", app.get("port"));
});
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////// HERE YOU CAN MAKE MORE FUNCTIONS TO HANDLE REQUESTS//////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

function getPerson(req, res){
    console.log("At getPerson Function")

    //this takes the end of the URL request to
    // Truly query into a database, in this case, it will be saved
    // in an id variable to be used later
    var p_id = req.query.p_id;


    //// !!!!!!!!!!!!!!!!!!!!!!!!!!
    /// !!!!! the request endpoint must match the column in the DATABASE!!!!!!!!!!!
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!
    console.log("Retriving person with id: ", p_id);

    // Use the getPersonFromDb function to get results from the DB
    getPersonFromDb(p_id, function(error, result){
        // if you dont get anything back from the DB then
        if (error || result == null || result.length !=1){
            // Display this error json string
            res.status(500).json({success:false, data: error});
        } else{
            //Else if the DB query worked, return the result
        console.log("The results from the Database are: ", result);
        res.json(result);
        }
    });   


}

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
/////////////////SUB FUNCTION OF getPerson //////////////// 
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
function getPersonFromDb(p_id, callback) {
     console.log("at getPersonFromDb function")

     //im not really sure here, but we first create a query and use $1 and pass it as an int like this
     // $1::int, My guess is that params in the first array position is [id], and it will be passed to 
     // the query in the pool.query to make the consult.
     var sql = "SELECT p_id, first_name, last_name, birth FROM person WHERE p_id = $1::int";
     var params = [p_id];

     pool.query(sql, params, function(err,result){
         if (err){
             console.log("Error with the DB");
             console.log(err);
             callback(err, null);
         }
         //console.log("Found DB result: " + JSON.stringify(result.rows));
         callback(null, result.rows);
     })

}