var practiceInfo = require('../models/practiceInfo.js');
var practiceDetails = require('../models/practiceDetails.js');
var drills = require('../models/drill.js');
//const { body } = require('express-validator');
const {generateUniqueNumbers} = require('../../helpers/uniqueNumbers.js');
const { body, param, validationResult } = require('express-validator');

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
            duration,
            fullIce,
            startDateTime,
            endDateTime,
            userId    
            } = req.body;


        console.log("***  titre de la pratique **", title);

        
        var prtInfo = new practiceInfo.PracticeInfo();
        var result =  await prtInfo.CreatePracticeInfo(title,duration,fullIce,userId, startDateTime, endDateTime);
        if ( result.length == 0)
        {
            return res.status(400).json({ errors: "Unable to create new practice" });
        }        
        var practiceId = result[0].practice_id;
        //selectDrills(result[0].practice_id, lenght);
        SelectDrillsF(duration, practiceId);
          
        //console.log("Drills : ", this.drillsArray);
        res.status(200).json(result[0]);
    },      
    
   
    validate(method)  {
        switch (method) {
            case 'createPractice': {
            return [ 
                body("title", "title doesn't exists").exists(),
                body("duration", "Practice duration is mandatory").exists(),
                body("userId", "UserId is mandatory").exists()
            ]   
            }
            case 'getPracticeDrills' : {
            return [
                body("practiceId", "practiceId is mandatory").exists()
            ]
                }
            case 'paramsId' : {
                return [
                    param("id", "UserId is not numeric").isInt()
                ]
            }
        }
    },

    async getPracticeDetails(req, res) {
        var PracticeId = req.params.id;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        var ptrDet = new practiceDetails.PracticeDetails();
        drillUrls =  await ptrDet.getPracticeDetails(PracticeId, true);
        
        return res.json({drillUrls});

    },

    async getUserPractices(req, res) {
        var userId = req.params.id;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        var prtInfo = new practiceInfo.PracticeInfo();
        var practices = await prtInfo.GetPracticesForUser(userId);

        return res.json({"practices" : practices });
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
            exer.getListDrills(lstDrillId).then(drillUrls =>
                {
                    res.json({drillUrls});
                })         
        }).catch(errors => res.status(400).json({errors}));       
    },

    async getDrill(req, res) {
        var exer = new drills.Drills();
        var id = req.params.id;
        if ( id > 0)
        {
            drill = await exer.getDrill(id);
            res.json({drill});
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

function SelectDrillsF(duration, practiceId) {
    console.log("***  selectDrills **", duration);
    const minPerDrill = 10;
    const nbDrills = Math.floor(duration / minPerDrill);
    console.log("***  nbDrills **", nbDrills);
    var exer = new drills.Drills();
    exer.getAllDrills().then((value) => {
        var drillsArray = generateUniqueNumbers(nbDrills, value.length); // *** Should add more robust and sophisticated drill selector.
        var prtDet = new practiceDetails.PracticeDetails();
        prtDet.insert(practiceId, drillsArray);
    });
}
