var db = require('../dev/dbQuery.js');

class PracticeDetails
{
    constructor(){
        this.practice_id = -1;
    };

    async pickExercices(practiceId, existingExercice)
    {
        console.log("*** models/PracticeDetails.js - pickExercices function **");
        

        var text = `
            SELECT exercice_id FROM hpg.exercices ORDER BY exercice_id ASC    
            WHERE exercice_id not in ($1)
            LIMIT 1;
            `;
        if ( existingExercice != null)
        {
            text = `
            SELECT exercice_id FROM hpg.exercices ORDER BY exercice_id ASC    
            LIMIT 1;
            `;

        }
        const values = existingExercice;
        
        const { rows } = await db.query(text,values);
        console.log("*** models/PracticeDetails.js - result **", rows);
        return rows;
    };

    async getExercices()
    {
        console.log("*** models/PracticeDetails.js - getExercices function **");
        

        var text = `
            SELECT * FROM hpg.exercices ORDER BY exercice_id;
            `;
       
        
        const { rows } = await db.query(text);
        console.log("*** models/getExercices.js - result **", rows);
        return rows;


    }
    
    insert()
    {

    }

}

module.exports = {
    PracticeDetails,
  };