var practiceInfo = require('../models/practiceInfo.js');
var practiceDetails = require('../models/practiceDetails.js');
var drills = require('../models/drill.js');
//const { body } = require('express-validator');
const {generateUniqueNumbers} = require('../../helpers/uniqueNumbers.js');
const { body, validationResult } = require('express-validator');

const Practice = 
{
    
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
            startDateTime,
            endDateTime,
            userId    
            } = req.body;


        console.log("***  titre de la pratique **", title);

        
        var prtInfo = new practiceInfo.PracticeInfo();
        var result =  await prtInfo.CreatePracticeInfo(title,length,fullIce,userId, startDateTime, endDateTime);
        if ( result.length == 0)
        {
            return res.status(400).json({ errors: "Unable to create new practice" });
        }        
        var practiceId = result[0].practice_id;
        //selectDrills(result[0].practice_id, lenght);
        SelectDrillsF(length, practiceId);
          
        //console.log("Drills : ", this.drillsArray);
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
            case 'getPracticeDrills' : {
            return [
                body("practiceId", "practiceId is mandatory").exists()
            ]
                }
        }
    },

    async getPracticeDetails(req, res) {
        var PracticeId = req.params.id;
        var ptrDet = new practiceDetails.PracticeDetails();
        drillUrls =  await ptrDet.getPracticeDetails(PracticeId, true);

        return res.json(drillUrls);

    },

    async getPracticeDrills(req, res) {
        
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        var ptrDet = new practiceDetails.PracticeDetails();
        ptrDet.getPracticeDetails(req.body.practiceId, false).then(lstDrillId => {
            
            if ( lstDrillId.length == 0) 
            {
                throw "Unable to find new practice";
            }
            var exer = new drills.Drills();
            exer.getListDrills(lstDrillId).then(lstDrillsDet =>
                {
                    res.json(lstDrillsDet);
                })         
        }).catch(errors => res.status(400).json({errors}));       
    },

    async getDrill(req, res) {
        var exer = new drills.Drills();
        var id = req.params.id;
        if ( id > 0)
        {
            drillDetails = await exer.getDrill(id);
            res.json(drillDetails);
        }
        else
        {
            res.status(400).json({ errors: "Unable to find new drill" });
        }
    }

}

module.exports = {
    Practice
  };

function SelectDrillsF(lenght, practiceId) {
    console.log("***  selectDrills **", lenght);
    const minPerDrill = 10;
    const nbDrills = Math.floor(lenght / minPerDrill);
    console.log("***  nbDrills **", nbDrills);
    var exer = new drills.Drills();
    exer.getAllDrills().then((value) => {
        var drillsArray = generateUniqueNumbers(nbDrills, value.length); // *** Should add more robust and sophisticated drill selector.
        var prtDet = new practiceDetails.PracticeDetails();
        prtDet.insert(practiceId, drillsArray);
    });
}
