var express = require('express');
var router = express.Router();
var fs = require("fs");
var config = require("config");

router.get('/', function (req, res) {

    var getlistUsers = readUserJson();
    res.send(getlistUsers);
});



function readUserJson() {
    
    var json = fs.readFileSync(config.userpath + "\listUsers.json", 'utf8').trim();
    var listOfUsers = JSON.parse(json);
    return listOfUsers;
}
module.exports = router;