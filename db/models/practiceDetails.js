var db = require('../dev/dbQuery.js');
var ExerciceEntity = require('../entities/ExerciceEntity.js');
//var ExeEntity = require('../entities/ExerciceEntity.js');

class PracticeDetails
{
    constructor(){
        this.practice_id = -1;
    };


    async getPracticeDetails(practiceId)
    {
        console.log("*** models/PracticeDetails.js - getPracticeDetails function **");
        
        var text = `
            SELECT * FROM hpg.practiceDetails
            WHERE practice_id = $1;
            `;
       
        var values = [practiceId];
     
        const { rows } = await db.query(text, values);

        var exercices = rows.map(this.copyElement)

        console.log("*** models/getExercices.js - result **", exercices);
        return exercices;
    };

    copyElement(exercice)
    {
        return exercice.exercice_id;        
    }
    
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