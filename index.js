var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var  pat = require('./db/controlers/practice.js');

var app = express();

// **** SET CONFIGURATION *****
// configure the app to use bodyParser()
   app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//app.use(expressValidator());
// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express router
var router = express.Router();

// Initial dummy route for testing
// http://localhost:3000/api
router.get('/', function(req, res) {
  res.json({ message: 'Welcome to the Hopge Server cors *' });
});


//PUT (Create) new Practice 
router.put('/practices/practice', pat.Practice.validate('createPractice'), pat.Practice.createPractice ); 

//Get (all) Practices for a user Id
router.get('/practices/user/:id', pat.Practice.validate('paramsId'), pat.Practice.getUserPractices)
//GET Practice Info for PracticeId
//router.get('/practices/infos/:id', pat.Practice.validate('paramsId'), pat.Practice.getUserPractices)

//GET Practice Drills only for practiceID
router.get('/practices/:id/drills', pat.Practice.validate('paramsId'),pat.Practice.getPracticeDetails ); 
//GET Drill by ID (drill_id)
router.get('/drills/:id', pat.Practice.getDrill );  

//try to not use this function (Multi-call, not "REST")
//router.get('/practices/:id/Drills', pat.Practice.validate('getPracticeDrills'), pat.Practice.getPracticeDrills );




app.use(cors()); //permet les appels localhost (a vérifier pour PROD)

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('HopeGe Server is running on port ' + port);