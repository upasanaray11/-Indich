var express = require('express');
var router = express.Router();
var fs = require("fs");

/* GET users listing. */
router.get('/', function (req, res) {

    var path = require("config");
    var catg = fs.readFileSync(path.datapath + "\Menu.json", "utf8").trim()
    var foodCategories = JSON.parse(catg);
    
    for (var i = 0; i < foodCategories.length; i++){
        foodCategories[i].imagepath = "./images/"+ foodCategories[i].imagepath;
        }
    
    
    res.send(JSON.stringify(foodCategories)); 


    //var subCatg = fs.readFileSync(path.datapath + "\Submenu.json", "utf8").trim()
    //var subCategories = JSON.parse(subCatg);
    //var finalMenu = [];

    //for (var i = 0; i < foodCategories.length;i++) {
    //    var temp = [];

    //    for (var j = 0; j < subCategories.length; j++) {
    //        if (foodCategories[i].id == subCategories[j].id) {
    //            temp[temp.length] = subCategories[j];
    //        }
    //    }
    //    finalMenu[finalMenu.length] = temp;
    //}
    //res.send(JSON.stringify(finalMenu));
});



router.get('/drinks', function (req, res) {

    var path = require("config");
    
    var subCatg = fs.readFileSync(path.datapath + "\Submenu.json", "utf8").trim()
    var subCategories = JSON.parse(subCatg);
    var finalMenu = [];

    for (var i = 0; i < subCategories.length; i++) {
        subCategories[i].imagepath = "./images/" + subCategories[i].imagepath;
    }

    for (var i = 0; i < subCategories.length; i++) {
        if (subCategories[i].id == 1) {
            finalMenu[finalMenu.length] = subCategories[i];
        }
    }
    res.send(JSON.stringify(finalMenu));
});


router.get('/appetizer', function (req, res) {

    var path = require("config");

    var subCatg = fs.readFileSync(path.datapath + "\Submenu.json", "utf8").trim()
    var subCategories = JSON.parse(subCatg);
    var finalMenu = [];
    for (var i = 0; i < subCategories.length; i++) {
        subCategories[i].imagepath = "./images/" + subCategories[i].imagepath;
    }
    for (var i = 0; i < subCategories.length; i++) {
        if (subCategories[i].id == 2) {
            finalMenu[finalMenu.length] = subCategories[i];
        }
    }
    res.send(JSON.stringify(finalMenu));
});

router.get('/entrees', function (req, res) {

    var path = require("config");

    var subCatg = fs.readFileSync(path.datapath + "\Submenu.json", "utf8").trim()
    var subCategories = JSON.parse(subCatg);
    var finalMenu = [];
    for (var i = 0; i < subCategories.length; i++) {
        subCategories[i].imagepath = "./images/" + subCategories[i].imagepath;
    }

    for (var i = 0; i < subCategories.length; i++) {
        if (subCategories[i].id == 3) {
            finalMenu[finalMenu.length] = subCategories[i];
        }
    }
    res.send(JSON.stringify(finalMenu));
});

router.get('/desserts', function (req, res) {

    var path = require("config");

    var subCatg = fs.readFileSync(path.datapath + "\Submenu.json", "utf8").trim()
    var subCategories = JSON.parse(subCatg);
    var finalMenu = [];
    for (var i = 0; i < subCategories.length; i++) {
        subCategories[i].imagepath = "./images/" + subCategories[i].imagepath;
    }

    for (var i = 0; i < subCategories.length; i++) {
        if (subCategories[i].id == 4) {
            finalMenu[finalMenu.length] = subCategories[i];
        }
    }
    res.send(JSON.stringify(finalMenu));
});

function readSubMenuJson() {
    
    var json = fs.readFileSync(path.datapath + "\Submenu.json", 'utf8').trim();
    var listOfMenuItems = JSON.parse(json);
    return listOfMenuItems;
}

module.exports = router;