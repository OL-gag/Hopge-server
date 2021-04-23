const e = require('express');
var db = require('../dev/dbQuery.js');


class Drills
{
    constructor(){
        
    };

    async createDrill(titleFr,titleEng,descriptionFr,descriptionEng,picture,skills,fullIce,version)
    {

        const text = `
        INSERT INTO hpg.drills (drill_name_fr, drill_name_eng, drill_description_fr, drill_description_eng, drill_picture_64, drill_skills, drill_full_ice, drill_version)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)  RETURNING drill_id;
        `;
        console.log("*** drill.js - IN before values **");  
        const values = [
            titleFr,
            titleEng,
            descriptionFr,
            descriptionEng,
            picture,            
            skills,
            fullIce,
            version
        ];
        console.log("*** drill.js - IN before query createDrill **");    
        const { rows } = await db.query(text,values);
        console.log("*** drill.js - IN after query createDrill **" + text + " -- " + values);  
        return rows;
  
    }

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

    async getAllDrillsId()
    {
        console.log("*** models/drills.js - getdrills function **");
        
        var text = `
            SELECT drill_id FROM hpg.drills ORDER BY drill_id;
            `;
       
        
        const { rows } = await db.query(text);
        console.log("*** models/drills.js - result **", rows.length);
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
        console.log("*** models/drills.js - result **", rows.length);
        return rows;
    };


}

module.exports = {
    Drills,
};