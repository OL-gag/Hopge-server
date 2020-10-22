const e = require('express');
var db = require('../dev/dbQuery.js');

class Drills
{
    constructor(){
        
    };

    async getDrill(id)
    {
        var text = `
            SELECT * FROM hpg.drills
            WHERE drill_id = $1;
            `;
       
        var values = [id];
     
        const { rows } = await db.query(text, values);

        return rows;
    }

    async getListDrills(listId)
    {
        console.log("**** getAlldrills " + listId);
        var text = `
        SELECT * FROM hpg.drills
        WHERE drill_id in (`;
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

    async getAllDrills()
    {
        console.log("*** models/drills.js - getdrills function **");
        
        var text = `
            SELECT * FROM hpg.drills ORDER BY drill_id;
            `;
       
        
        const { rows } = await db.query(text);
        console.log("*** models/drills.js - result **", rows);
        return rows;


    };

    async pickDrills(practiceId, existingdrill)
    {
        console.log("*** models/drills.js - pickdrills function **");
        

        var text = `
            SELECT drill_id FROM hpg.drills ORDER BY drill_id ASC    
            WHERE drill_id not in ($1)
            LIMIT 1;
            `;
        if ( existingdrill != null)
        {
            text = `
            SELECT drill_id FROM hpg.drills ORDER BY drill_id ASC    
            LIMIT 1;
            `;

        }
        const values = existingdrill;
        
        const { rows } = await db.query(text,values);
        console.log("*** models/drills.js - result **", rows);
        return rows;
    };


}

module.exports = {
    Drills,
};