var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var dal = require('./data-access-hk.js');

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


router.put('/createPractice', function (req, res) {
   
    //console.log("Req : %s", req)
    // First read existing users.
    var prtTitle = req.body.title;
    console.log("Titre de la pratique : %s", prtTitle);
    
    const dahk = new dal.dataAccesHK();
    dahk.savePractice(prtTitle);

    const message1 = {
        "API" : "/createPractice",
        "Titre" : prtTitle
    };

    res.json(message1);
   
})

app.use(cors()); //permet les appels localhost (a vérifier pour PROD)

// Register all our routes with /api
app.use('/api', router);


// Start the server
app.listen(port);
console.log('HK Server is running on port ' + port);