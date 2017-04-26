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

router.post("/addNewItemToSubMenu", function (req, res) {
    
    var getListOfSubMenuItems = readSubMenuJson();

    var newSubMenuItem = {
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        imagepath: null
    };
    var response = addNewItemToSubMenu(newSubMenuItem, getListOfSubMenuItems);
    res.send(response);
});

router.post("/removeItemFromSubMenu", function (req, res) {
    
    var getListOfSubMenuItems = readSubMenuJson();

    var subMenuItemName = req.body.name;
    var response = removeItemFromSubMenu(subMenuItemName, getListOfSubMenuItems);
    res.send(response);
});

router.post("/changePriceOfMenuItem", function (req, res) {

    var getListOfSubMenuItems = readSubMenuJson();
    var subMenuItemNewPrice = req.body.price;
    var subMenuItemName = req.body.name;
    var response = changePriceOfMenuItem(subMenuItemName, subMenuItemNewPrice, getListOfSubMenuItems)
    res.send(response);
});

function readSubMenuJson() {
    var json = fs.readFileSync(path.datapath + "\Submenu.json", 'utf8').trim();
    var listOfSubMenuItems = JSON.parse(json);
    return listOfSubMenuItems;
}

function addNewItemToSubMenu(newSubMenuItem, getListOfSubMenuItems) {
    var response = {};
    for (var i = 0; i < getListOfSubMenuItems.length; i++) {
        if (newSubMenuItem.name == getListOfSubMenuItems[i].name) {
            response = {
                newSubMenuItem: newSubMenuItem,
                popup: "SubMenuItem is already present",
                isSuccess: false
            }
            return response;
        }
    }
    getListOfSubMenuItems[getListOfSubMenuItems.length] = newSubMenuItem;
    fs.writeFileSync(path.datapath + "\Submenu.json", JSON.stringify(getListOfSubMenuItems), 'utf8')
    response = {
        newSubMenuItem: newSubMenuItem,
        popup: "Added the item in Sub-menu!!",
        isSuccess: true
    }
    return response;
}

function removeItemFromSubMenu(subMenuItemName, getListOfSubMenuItems) {
    var response = {};
    for (var i = 0; i < getListOfSubMenuItems.length; i++) {
        if (subMenuItemName == getListOfSubMenuItems[i].name) {
            getListOfSubMenuItems.splice(i,1);
            fs.writeFileSync(path.datapath + "\Submenu.json", JSON.stringify(getListOfSubMenuItems), 'utf8')
            response = {
                subMenuItemName: subMenuItemName,
                popup: "SubMenuItem is present and deleted",
                isSuccess: true
            }
            return response;
        }
    }
    getListOfSubMenuItems[getlistUsers.length] = newSubMenuItem;
    fs.writeFileSync(path.datapath + "\listUsers.json", JSON.stringify(getListOfSubMenuItems), 'utf8')
    response = {
        newSubMenuItem: newSubMenuItem,
        popup: "SubMenuItem is not present and hence cannot be deleted",
        isSuccess: false
    }
    return response;
}

function changePriceOfMenuItem(subMenuItemName, subMenuItemNewPrice, getListOfSubMenuItems) {
    var response = {};
    for (var i = 0; i < getListOfSubMenuItems; i++) {
        if (subMenuItemName == getListOfSubMenuItems[i].name) {
            getListOfSubMenuItems[i].price = subMenuItemNewPrice;
            fs.writeFileSync(path.datapath + "\Submenu.json", JSON.stringify(getListOfSubMenuItems), 'utf8')
            response = {
                subMenuItemName: subMenuItemName,
                popup: "Price changed",
                isSuccess: true
            }
            return response;
        }
    }
    response = {
        subMenuItemName: subMenuItemName,
        popup: "Price not changed",
        isSuccess: false
    }
}

module.exports = router;