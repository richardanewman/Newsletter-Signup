//jshint esversion: 6
const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }

      }
    ]
  };

  var jsonData = JSON.stringify(data);

  var option = {
    url: process.env.CLIENT_URL,
    method: "POST",
    headers: {
      "Authorization": process.env.CLIENT_SECRET
    },
    body: jsonData

  };

  request(option, function(error, response, body){
    if(error) {
      res.sendFile(__dirname + "/failure.html");
    }else {
      if(response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      }else{
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
  app.post("/failure", function(req, res){
    res.redirect("/");
  });

});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000.");
});


//6b46babba28e8aace813e8740a0c518a-us20
//4b5a1757d4
