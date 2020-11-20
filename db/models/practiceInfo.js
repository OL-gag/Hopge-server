var db = require('../dev/dbQuery.js');

class PracticeInfo
{
    constructor(){
        this.practice_id = -1;
    };

    async CreatePracticeInfo(title, duration, fullice, userId, startDateTime , endDateTime, skills)
    {
        console.log("*** models/praticeInfo.js - CreatePracticeInfo function **");
        let ts = Date.now();
        
        if ( startDateTime == null )
        {
            startDateTime = new Date(ts);
            startDateTime.setHours(0,0,0,0);
        }
        if ( endDateTime == null )
        {
            endDateTime = new Date(ts);
            endDateTime.setHours(0,duration,0,0);
        }

        const text = `
            INSERT INTO hpg.practiceinfo (title, duration, fullice, user_id, startDtm, endDtm, creationDtm, skills)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)  RETURNING practice_id;
            `;

        const values = [
            title,
            duration,
            fullice,
            userId,
            startDateTime,
            endDateTime,
            new Date(Date.now()),
            skills
        ];
        
        const { rows } = await db.query(text,values);
      
       
        /*.then((value) => {
            this.practice_id = value.rows[0].practice_id;
            resolve(value.rows[0].practice_id);
        });
        */
        return rows;
     }

     convertIdUrl(pInfo)
     {
        pInfo.drillsRef =   process.env.SERVER_URL + "practices/" + pInfo.practice_id + "/drills"  
        return pInfo;
     }

     async GetPracticesForUser(userId)
     {
          const text = `
                SELECT * FROM hpg.practiceinfo WHERE user_id = $1;
            `;

        const values = [
            userId
        ];
        
        const { rows } = await db.query(text,values);

        rows.map(this.convertIdUrl)

        return rows;
     }
}

module.exports = {
    PracticeInfo,
  };