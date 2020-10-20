const e = require('express');
var db = require('../dev/dbQuery.js');
var ExerciceEntity = require('../entities/ExerciceEntity.js');
//var ExeEntity = require('../entities/ExerciceEntity.js');

class Exercices
{
    constructor(){
        
    };

    async getExercice(id)
    {
        var text = `
            SELECT * FROM hpg.exercices
            WHERE exercice_id = $1;
            `;
       
        var values = [id];
     
        const { rows } = await db.query(text, values);

        return rows;
    }

    async getAllExercices(listId)
    {
        var text = `
        SELECT * FROM hpg.exercices
        WHERE exercice_id in (`;
        let vIndex = 1;
        for (let i = 0; i <= listId.length-1; i++)
        {
            text += '$' + vIndex++;  
            if ( i == listId.length-1)
            {
                text += ');'
            }
            else
            {
                text += ', '
            }
        }

        const { rows } = await db.query(text, listId);

        return rows;
    }

    async getAllExercices()
    {
        console.log("*** models/Exercices.js - getExercices function **");
        
        var text = `
            SELECT * FROM hpg.exercices ORDER BY exercice_id;
            `;
       
        
        const { rows } = await db.query(text);
        console.log("*** models/Exercices.js - result **", rows);
        return rows;


    };

    async pickExercices(practiceId, existingExercice)
    {
        console.log("*** models/Exercices.js - pickExercices function **");
        

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
        console.log("*** models/Exercices.js - result **", rows);
        return rows;
    };


}

module.exports = {
    Exercices,
};