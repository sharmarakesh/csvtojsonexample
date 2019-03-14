require('fs');

var appRouter = function (app) {

    app.get("/test", function(req, res) {
        readFromCsv(res);
    });

    function readFromCsv(res) {
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
            res.send(myData);
        }); 
    }
}

module.exports = appRouter;