var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

//var pat = require('./db/controlers/practice.js');
var  pat = require('./db/controlers/practice.js');

var app = express();

// **** SET CONFIGURATION *****
// configure the app to use bodyParser()
   app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

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
router.get('/getPractice', pat.Practice.getPratice ); 
router.put('/createPractice', pat.Practice.createPractice ); 


/*router.get('/getPractice', function (req, res){
    
    var prtPracticeId = req.body.practice_id;
    console.log("Numéro de la pratique : %s", prtPracticeId);
    var p = new pat.Practice();
    var x = p.getExercices(prtPracticeId) /*.then((value) => {

        console.log("*** HERE ****", value);
        res.json(value);
    })
    res.json(x);
    res.json("erreur");   

});
*/



//router.put('/api/v1/createPractice', Practice.create);

app.use(cors()); //permet les appels localhost (a vérifier pour PROD)

// Register all our routes with /api
app.use('/api', router);


// Start the server
app.listen(port);
console.log('HK Server is running on port ' + port);