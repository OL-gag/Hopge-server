var db = require('../dev/dbQuery.js');

class PracticeInfo
{
    constructor(){
        this.practice_id = -1;
    };

    async CreatePracticeInfo(title, lenght, fullice, userId)
    {
        console.log("*** models/praticeInfo.js - CreatePracticeInfo function **");
        const text = `
            INSERT INTO hpg.practiceinfo (title, lenght, fullice, user_id)
            VALUES ($1, $2, $3, $4) RETURNING practice_id;
            `;

        const values = [
            title,
            lenght,
            fullice,
            userId
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