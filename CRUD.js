//to define http libararies , to make http requests.
var http = require("http")

//To define postgre libraries
var pg = require("pg")

var p = 5400;

//Local data to perform actions.
var data = [{"name":"aman", "Sex": "Male"},{"mohit":"Manoj", "Sex":"Male"},{"monika":"Sai","Sex":"female"}];
	

//The below instructions is the example to get connect with the database.
	var getRecords = function(req, res, callback){
		console.log("Get Records");
                //Local url for postgresql domain.
		var conString = "pg://postgres:3267635@localhost:5432/TestDB";
                var client = new pg.Client(conString);
                client.connect();
	

//query the database to insert data.
        var query = client.query('insert id,fname,lname from "Student"  order by id');
          query.on("row", function(row, result)
              {
                 result.addRow(row);
              });

//to represnt the results extract from database.
query.on("end", function(result)
{                 
    client.end();
    data = JSON.stringify(result.rows, null, "    ");
    //console.log(data);
    callback(req, res);
});
	};


//Below instructions helps to call the function  execute above
	http.createServer(function(req, res) {
		if(req.method == 'GET') {
		console.log("Get Request in main");
		getRecords(req, res, writeResults);
		}
		if(req.method == 'POST'){
			updateRecords(req, res, writeResults)
		}
	}).listen(port);
console.log("Connected to " + port + "   localhost" );

