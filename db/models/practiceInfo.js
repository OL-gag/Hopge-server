var db = require('../dev/dbQuery.js');

class PracticeInfo
{
    constructor(){
        this.practice_id = -1;
    };

    async CreatePracticeInfo(title, length, fullice, userId, startDateTime , endDateTime)
    {
        console.log("*** models/praticeInfo.js - CreatePracticeInfo function **");
        let ts = Date.now();

        let date_ob = new Date(ts);
        if ( startDateTime == null )
        {
            startDateTime = new Date(ts);
            startDateTime.setHours(0,0,0,0);
        }
        if ( endDateTime == null )
        {
            endDateTime = new Date(ts);
            endDateTime.setHours(0,length,0,0);
        }

        const text = `
            INSERT INTO hpg.practiceinfo (title, lenght, fullice, user_id, startDtm, endDtm, creationDtm)
            VALUES ($1, $2, $3, $4, $5, $6, $7)  RETURNING practice_id;
            `;

        const values = [
            title,
            length,
            fullice,
            userId,
            startDateTime,
            endDateTime,
            new Date(Date.now())
        ];
        
        const { rows } = await db.query(text,values);
        
        /*.then((value) => {
            this.practice_id = value.rows[0].practice_id;
            resolve(value.rows[0].practice_id);
        });
        */
        return rows;
     }
}

module.exports = {
    PracticeInfo,
  };