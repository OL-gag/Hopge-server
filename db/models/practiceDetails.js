const { isDate } = require('moment');
var db = require('../dev/dbQuery.js');


class PracticeDetails
{
    constructor(){
        this.practice_id = -1;
    };


    async getPracticeDetails(practiceId, url)
    {
        console.log("*** models/PracticeDetails.js - getPracticeDetails function **");
        
        var text = `
            SELECT * FROM hpg.practiceDetails
            WHERE practice_id = $1;
            `;
       
        var values = [practiceId];
     
        const { rows } = await db.query(text, values);

        if ( url )
        {
            return rows.map(this.copyElementUrl)
        }
              
        return rows.map(this.copyElementId);
       
    };

    copyElementUrl(drill)
    {
        return process.env.SERVER_URL + "drills/" + drill.drill_id;                        
    }

    copyElementId(drill)
    {
        return drill.drill_id;                        
    }
    
    async insert(practiceId, listNoExerciceId)
    { 
        let j = 0;
        var insertClause = 'Insert INTO hpg.practiceDetails (practice_id, drill_id) VALUES ';
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