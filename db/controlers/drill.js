const { body, param, validationResult } = require('express-validator');
const fs = require('fs');
const drill = require('../models/drill.js');
var dotenv = require('dotenv');


const Drill = 
{
    async createDrill(req, res) {
        console.log("*** drill.js - create function **");

        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            titleFr,
            titleEng,
            descriptionFr,
            descriptionEng,
            picture,
            skills,
            version    
            } = req.body;

        var newDrill = new drill.Drills();
        var result =  await newDrill.createDrill(titleFr,titleEng,descriptionFr,descriptionEng,picture, skills, version);
        if ( result.length == 0)
        {
            
            return res.status(400).json({ errors: "Unable to create new drill" });

        }                
        saveToFile(titleFr, req.body);
        res.status(200).json(result[0]);
    },

    validate(method)  {
        switch (method) {
            case 'createDrill': {
            return [ 
                body("titleFr", "titleFr is mandatory").exists(),
                body("titleEng", "titleEng is mandatory").exists(),
                body("descriptionFr", "descriptionFr is mandatory").exists(),
                body("descriptionEng", "descriptionEng is mandatory").exists(),
                body("picture", "picture is mandatory").exists(),
                body("skills", "skills is mandatory").exists()
            ]   
            }          
        }
    },

   
}

function saveToFile(title, req)
{
  dotenv.config();

  title =  process.env.FOLDER_SAVE + title + Date.now() + ".json"
  let data = JSON.stringify(req, null,1);
  fs.writeFileSync(title, data);
}

module.exports = {
    Drill
  };