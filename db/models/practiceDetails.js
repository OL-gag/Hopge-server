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


    };
    
    async insert(practiceId, listNoExerciceId)
    { 
        let j = 0;
        var insertClause = 'Insert INTO hpg.practiceDetails (practice_id, exercice_id) VALUES ';
        var values = [];
        for(let i = 0; i <= listNoExerciceId.length-1; i++)
        {
            insertClause += '($' + ++j + ', $'+ ++j + ')';
            if ( i != listNoExerciceId.length-1)
            {
                insertClause += ', '
            }
            values.push(practiceId);
            values.push(listNoExerciceId[i]);
        }
        insertClause += ';';

        
        console.log(insertClause);
        await db.query(insertClause,values);
        /*
        { text:
            'INSERT INTO "users" ("email", "name") VALUES ($1, $2), ($3, $4) RETURNING "id"',
           values: [ 'test@example.com', 'Fred', 'test2@example.com', 'Lynda' ] }  */


    }

}

module.exports = {
    PracticeDetails,
  };