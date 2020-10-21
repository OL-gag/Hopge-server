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


//router.put('/createPractice', Practice.create);
router.get('/getPractice', pat.Practice.validate('getPractice'), pat.Practice.getPractice ); 
router.put('/createPractice', pat.Practice.validate('createPractice'), pat.Practice.createPractice ); 

app.use(cors()); //permet les appels localhost (a vérifier pour PROD)

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('HopeGe Server is running on port ' + port);