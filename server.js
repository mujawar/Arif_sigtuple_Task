var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('driverlist', ['driverlist']);
var bodyParser = require('body-parser');


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/driverlist', function (req, res) {
    console.log('i recieved get request');
    db.driverlist.find(function (err, docs) {
        console.log('docs' + JSON.stringify(docs));
        res.json(docs)
    })
});

app.post('/driverlist', function (req, res) {
    console.log('i recieved post request');
    console.log(req.body)
    db.driverlist.insert(req.body, function (err, doc) {
        res.json(doc)
    })
});

app.delete('/driverlist/:id', function (req, res) {
    var id = req.params.id
    console.log(id);
    db.driverlist.remove({_id: mongojs.ObjectId(id)}, function (doc) {
        res.json(doc);
    })
})

app.get('/driverlist/:id', function (req, res) {
    var id = req.params.id;
    console.log('server edit id' + JSON.stringify(id));
    db.driverlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
        console.log('doc---------' + JSON.stringify(doc));
        res.json(doc)
    })
})

app.put('/driverlist/:id', function (req, res) {
    console.log('req.body update',req.body);
    var id = req.params.id;
    console.log(id);
    console.log(req.body.name);
    db.driverlist.findAndModify({
        query: {_id: mongojs.ObjectId(id)},
        update: {
            $set: {
                id: req.body.id,
                name: req.body.name,
                address: req.body.address,
                zip: req.body.zip,
                date: req.body.date,
                email: req.body.email,
                contact: req.body.contact,
                gpa: req.body.gpa,
                department: req.body.department[0]
            }
        },
        new: true
    }, function (err, doc) {
        res.json(doc);
    })
})


app.listen(5000);
console.log('server is started at 5000 port');

