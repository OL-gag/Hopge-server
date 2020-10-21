var practiceInfo = require('../models/practiceInfo.js');
var practiceDetails = require('../models/practiceDetails.js');
var exercices = require('../models/exercices.js');
//const { body } = require('express-validator');
const {generateUniqueNumbers} = require('../../helpers/uniqueNumbers.js');
const { body, validationResult } = require('express-validator');

const Practice = 
{
    
   /* constructor(){
       this.prtInfo = new practiceInfo.PracticeInfo();
       this.prtDet = new practiceDetails.PracticeDetails();
       this.prtExer = new exercices.Exercices();

       this.exercicesArray = [];
    }*/

    async createPractice(req, res) {
    
        console.log("*** pratice.js - create function **");
          // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            title,
            length,
            fullIce,
            userId    
            } = req.body;


        console.log("***  titre de la pratique **", title);

        
        var prtInfo = new practiceInfo.PracticeInfo();
        var result =  await prtInfo.CreatePracticeInfo(title,length,fullIce,userId);
        if ( result.length == 0)
        {
            return res.status(400).json({ errors: "Unable to create new practice" });
        }        
        var practiceId = result[0].practice_id;
        //selectExercices(result[0].practice_id, lenght);
        SelectExercicesF(length, practiceId);
          
        //console.log("Exercices : ", this.exercicesArray);
        res.status(200).json(result[0]);
    },      
    
   
    validate(method)  {
        switch (method) {
            case 'createPractice': {
            return [ 
                body("title", "title doesn't exists").exists(),
                body("length", "Practice Length is mandatory").exists(),
                body("userId", "UserId is mandatory").exists()
            ]   
            }
            case 'getPractice' : {
            return [
                body("practiceId", "practiceId is mandatory").exists()
            ]
                }
        }
    },

    async getPractice(req, res) {
        
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        var ptrDet = new practiceDetails.PracticeDetails();
        ptrDet.getPracticeDetails(req.body.practiceId).then(lstExerciceId => {
            
            if ( lstExerciceId.length == 0) 
            {
                throw "Unable to find new practice";
            }
            var exer = new exercices.Exercices();
            exer.getListExercices(lstExerciceId).then(lstExercicesDet =>
                {
                    res.json(lstExercicesDet);
                })         
        }).catch(errors => res.status(400).json({errors}));       
    }

}

module.exports = {
    Practice
  };

function SelectExercicesF(lenght, practiceId) {
    console.log("***  selectExercices **", lenght);
    const minPerExercice = 10;
    const nbExercices = Math.floor(lenght / minPerExercice);
    console.log("***  nbExercices **", nbExercices);
    var exer = new exercices.Exercices();
    exer.getAllExercices().then((value) => {
        var exercicesArray = generateUniqueNumbers(nbExercices, value.length); // *** Should add more robust and sophisticated exercice selector.
        var prtDet = new practiceDetails.PracticeDetails();
        prtDet.insert(practiceId, exercicesArray);
    });
}
