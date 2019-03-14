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
                myData.push({'memberid': data.MemberId, 'memberFirstName': data.MemberFirstName, 'memberLastName': data.MemberLastName, 'requestType': data.RequestType, 'oralNotifocationDate': data.OralNotifocationDate,'WrittenNotificationDate': data.WrittenNotificationDate,'state': data.state});
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
