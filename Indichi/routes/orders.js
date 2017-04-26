var express = require('express');
var router = express.Router();
var fs = require("fs");
var config = require("config");

router.post("/newOrder", function (req, res) {
    var order = req.body.items;
    if (req.session.loginAs) {
        var uname = req.session.loginAs;
        var readFile = fs.readFileSync(config.datapath + "/orders.json", 'utf8').trim();
        var readOrders = JSON.parse(readFile);
        var isMatched = false;
        console.log(order);
        var orderHistory = {
            orderDate: new Date(),
            Delivered: "No",
            orderItem: order
        };

        for (var i = 0; i < readOrders.length; i++) {
            if (uname == readOrders[i].uname) {
                isMatched = true;
                readOrders[i].orderHistory.push(orderHistory);
                writeFile(readOrders);
                var response = {
                    popup: "Your item has been added successfully!"
                }
                res.send(response);
                return;
            }
        }
        if (!isMatched) {
            var newOrder = {};
            newOrder.uname = req.session.loginAs;
            newOrder.orderHistory = [orderHistory];
        }
        readOrders.push(newOrder);

        writeFile(readOrders);
        var response = {
            popup: "You have entered successfully!"
        }
        res.send(response);
    }

    else {
        var response = {
            popup: "Please login and then come back!"
        }
        res.send(response);
    }


});

//router.get('/getorder', function (req, res) {

//    var path = require("config");

//    var subCatg = fs.readFileSync(path.datapath + "\orders.json", "utf8").trim()
//    var order = JSON.parse(subCatg);
//    var finalorder = [];
//    var orderhis = [];

//    for (var i = 0; i < order.length; i++) {
//        if (order[i].uname == req.session.loginAs)
//        {
//            orderhis = order[i].orderHistory;

//            for (var i = 0; i < orderhis.length; i++) {
//                if (orderhis[i].Delivered == "no") {
//                    finalorder = orderhis[i].orderItem;
//                }
//            }
//        }
//    }

    
//    res.send(JSON.stringify(finalorder));
//});

function writeFile(obj) {
    fs.writeFileSync(config.datapath + "/orders.json", JSON.stringify(obj), 'utf8')
}
module.exports = router;