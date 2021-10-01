var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Cars = require('./app/models/vehicle');

//config for body-bodyParser

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// setup port

var port = process.env.PORT || 3000;

//connect to // DEBUG:
mongoose.connect('mongodb://localhost:27017/AWcars');



var router = express.Router();

app.use('/api', router);

//middleware
router.use(function(req, res, next){
console.log('FYI... we are doing something.....');
  next();
});


//test
router.get('/', function(req, res) {
  res.json({message: 'welcome!'});

});

router.route('/cars')
  .post(function(req, res) {
    var vehicle = new Cars(); // new instance of a vehicle
    vehicle.make = req.body.make;
    vehicle.model = req.body.model;
    vehicle.colour = req.body.colour;

    vehicle.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({message: 'Vehicle was successfully manufactured'});
    });
  })

.get(function(req, res) {
  Cars.find(function(err, cars) {
    if(err) {
      res.send(err);

    }
    res.json(cars);
  });
});

router.route('/car/:car_id')
.get(function(req, res){

  Cars.findById(req.params.car_id, function(err, car){
    if(err){
      res.send(err);
    }
    res.json(car);
  });
});

router.route('/car/make/:make')
.get(function(req, res){
  Cars.find({make:req.params.make}, function(err, car) {
    if(err){
      res.send(err);
    }
    res.json(car);
  });
});

router.route('/car/colour/:colour')
.get(function(req, res){
  Cars.find({colour:req.params.colour}, function(err, car) {
    if(err){
      res.send(err);
    }
    res.json(car);
  });
});

app.listen(port);

//print
console.log('serverlistening on port ' + port);
