// index.js
// where node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

function isDateValid(dateStr) {
  return !isNaN(new Date(dateStr));
}

app.get("/api/:date?", function(req,res){
  let date = req.params.date;
  
  if(date){
    const isUnixTimestamp = /^\d{13}$/.test(date);
    
    if(isUnixTimestamp){
      console.log("unix time req");
      let unix_time = parseInt(date);
      let unix_utc = new Date(unix_time).toUTCString();  
      return res.json({
        unix: unix_time,
        utc: unix_utc        
      });
    }
    
    else if(!isDateValid(date)){
      return res.json({error: "invalid date"});
    }
  
    else{
    console.log("date time req");
    let date_value = new Date(date);
    let unix_time = date_value.getTime();
    let utc_time = date_value.toUTCString();
    res.json({
      unix: unix_time,
      utc: utc_time
    });
}}
  
  else{
    console.log("empty date req");
    let cur_time = new Date().getTime();
      return res.json({
        unix: cur_time,
        utc: cur_time
      });
  }
  
});
        
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);

});
