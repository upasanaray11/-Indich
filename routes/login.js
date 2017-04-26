var express = require('express');
var router = express.Router();
var fs = require("fs");
var config = require("config");

router.post("/registerUser", function (req, res) {
    
    var getlistUsers = readUserJson();

    var newUser = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        uname: req.body.uname
    };
    var response = registerUser(newUser, getlistUsers);
    if (response.popup == "Added the new user.Welcome!") {
            var session = req.session;
            session.loginAs = newUser.uname;
          }
    res.send(response);
});

router.post("/signin", function (req, res) {
    var getlistUsers = readUserJson();
    var newUser = {
        uname: req.body.uname,
        password: req.body.password        
    };

    
    var response = signInUser(newUser, getlistUsers);
    if (response.popup == "Wow!!You logged in successfully") {
        var session = req.session;
        session.loginAs = newUser.uname;
        }
    res.send(response);
});

function readUserJson() {
    
    var json = fs.readFileSync(config.userpath + "\listUsers.json", 'utf8').trim();
    var listOfUsers = JSON.parse(json);
    return listOfUsers;
}

function registerUser(newUser, getlistUsers) {
    var response = {};
    for (var i = 0; i < getlistUsers.length; i++) {
        if (newUser.uname == getlistUsers[i].uname) {
            response = {
                newUser: newUser,
                popup: "User is already present"
            }
            return response;
        }
    }
    getlistUsers[getlistUsers.length] = newUser;
    fs.writeFileSync(config.userpath + "\listUsers.json", JSON.stringify(getlistUsers), 'utf8')
    response = {
        newUser: newUser,
        popup: "Added the new user.Welcome!"
    }
    return response;
}


function signInUser(newUser, getlistUsers) {
    var response = {};
    for (var i = 0; i < getlistUsers.length; i++) {
        if (newUser.uname == getlistUsers[i].uname && newUser.password == getlistUsers[i].password) {
            response = {
                newUser: newUser,
                popup: "Wow!!You logged in successfully",
                isSuccessful: true
            }
            
            return response;
        }
    }
    response = {
        newUser: newUser,
        popup: "Sorry!Please try again.",
        isSuccessful: false
    }
    return response;
}
module.exports = router;
