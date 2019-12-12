const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/' , function(req,res)  {
    res.sendFile(__dirname +'/signup.html');
});

app.post('/',function(req,res) {
    var firstname= req.body.fName;
    var lastname = req.body.lName;
    var email = req.body.email;

    console.log(firstname,lastname,email);

    var data = { 
        members:[
        {
            email_address : email,
            status :"subscribed",
            merge_fields:{
                FNAME :firstname,
                LNAME :lastname
            }
        }
    ]
    };

    var jsonData = JSON.stringify(data);


    var options = {
        url : "https://us4.api.mailchimp.com/3.0/lists/ab4af43e10",
        method: "POST",
        headers:{
            "Authorization" : "AnilDesai01 f33a4539dfe3f7be94d910c6a69e40bb-us4"
        },
       body : jsonData
    };

    request(options,function(error,response,body) {
        if(error) {
            res.sendFile(__dirname + "/failure.html");
        }
        else{
            console.log(response.statusCode);
            if(response.statusCode === 200 )
            {
                res.sendFile(__dirname + "/success.html");
            }
            else{
            res.sendFile(__dirname + "/failure.html");
            }
        }

    });

});

// app.get('/failure',function(req,res) {
//     res.redirect("/");
// });

app.listen(process.env.PORT || 4000 , function()  {
    console.log("server started in the port 4000");
});


//api key
// f33a4539dfe3f7be94d910c6a69e40bb-us4
// unique list
// ab4af43e10





