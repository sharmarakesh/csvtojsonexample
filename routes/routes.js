require('fs');

var appRouter = function (app) {

    app.get("/test", function(req, res) {
        //Converter Class
        dd(res);
        // res.send(c);

    });

    function dd(res) {
        const fs = require('fs'); 
        const csv = require('csv-parser');
        let myData = [];
        fs.createReadStream('data/mycsv.csv')
        .pipe(csv())
        .on('data', function(data){
            try {
                myData.push({'name': data.name, 'age': data.age});
                //perform the operation
            }
            catch(err) {
                //error handler
            }
        })
        .on('end',function(){
            //some final operation
            console.log(myData);
            res.send(myData);
        }); 
    }

    app.get("/", function (req, res) {
        res.send("Hello World");
    });

    app.get("/csvjson", function (req, res) {
        const csvFilePath='data/test.csv';
        console.log('FILE PATH : ', csvFilePath);
        const csv=require('csvtojson');
// csv()
// .fromFile(csvFilePath)
// .then((jsonObj)=>{
//     console.log(jsonObj);
//     /**
//      * [
//      * 	{a:"1", b:"2", c:"3"},
//      * 	{a:"4", b:"5". c:"6"}
//      * ]
//      */ 
// })
 
// Async / await usage
// const jsonArray = csv().fromFile(csvFilePath);
        res.send(csv().fromFile(csvFilePath));
    });

    app.get("/account", function (req, res) {
        var accountMock = {
            "username": "nraboy",
            "password": "1234",
            "twitter": "@nraboy"
        }
        if (!req.query.username) {
            return res.send({
                "status": "error",
                "message": "missing username"
            });
        } else if (req.query.username != accountMock.username) {
            return res.send({
                "status": "error",
                "message": "wrong username"
            });
        } else {
            return res.send(accountMock);
        }
    });
    app.post("/account", function (req, res) {
        if (!req.body.username || !req.body.password || !req.body.twitter) {
            return res.send({
                "status": "error",
                "message": "missing a parameter"
            });
        } else {
            return res.send(req.body);
        }
    });

    app.get("/jsonFromCsv", function (req, res) {
        // //require the csvtojson converter class
        // let Converter = require("csvtojson").Converter;
        // // create a new converter object
        // let converter = new Converter({});

        // // call the fromFile function which takes in the path to your
        // // csv file as well as a callback function
        // let json = [];
        // converter.fromFile("data/mycsv.csv", function (err, result) {
        //     // if an error has occured then handle it
        //     if (err) {
        //         console.log("An Error Has Occured");
        //         console.log(err);
        //     }
        //     // create a variable called json and store
        //     // the result of the conversion
            
        //         json = result;
        //         // log our json to verify it has worked
        //     console.log('LOVE YOU : ', json);
      
        // });
        // console.log(json);
        // res.send('red');
        var Converter=require("csvtojson").Converter;
        let converter = new Converter({});
       // var csvConverter=new Converter({constructResult:false}); // The parameter false will turn off final result construction. It can avoid huge memory consumption while parsing. The trade off is final result will not be populated to end_parsed event.

        var readStream=require("fs").createReadStream("data/mycsv.csv");
        var writeStream=require("fs").createWriteStream("data/outpuData.json");
        readStream.pipe(converter).pipe(writeStream);

        fileContent = require("fs").readFileSync("data/mycsv.csv", {encoding: 'utf8'});
        console.log('file : ', fileContent);
        res.send(fileContent);
            });
            
}



 function readFile(path) {
    const fs = require('fs'); 
    var fileContent;

    return new Promise(function(resolve) {
        fileContent = fs.readFileSync(path, {encoding: 'utf8'});
        resolve(fileContent);
    });
}

module.exports = appRouter;