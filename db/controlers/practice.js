var pi = require('../models/PracticeInfo.js');

class Practice
{
    
    constructor(){
       this.prtInfo = new pi.PracticeInfo();
    }

    create(req, res) {
    
        console.log("*** pratice.js - create function **")
    
        const prtTitle = req.body.title;
        const prtLenght = req.body.lenght;
        const prtFullIce = req.body.fullIce;
        const prtUserId = req.body.userId;
        console.log("***  titre de la pratique **", prtTitle);
        /*
        this.prtInfo.CreatePracticeInfo(prtTitle,prtLenght,prtFullIce,prtUserId).then((value) => {
            console.log("***  Retour insert **", value);
        });    */       
        this.prtInfo.CreatePracticeInfo(prtTitle,prtLenght,prtFullIce,prtUserId).then( (value) => this.selectExercices(value, prtLenght));
       // console.log("***  Retour insert **", result);
        //selectExercices();
    
  }
  
  selectExercices(practiceID, prtLenght)
  {
    console.log("***  selectExercices **", prtLenght);
  }

}
module.exports = {
    Practice,
  };
//export default Practice;
/*

    createPractice(title, userid, skillist, fullice, lenght)
    {      
        // create practice info
        var result = this.createPracticeInfo(title, lenght, fullice, userid);
        var myid = 1;//result.rows[0];
        // pick exercice from list
        

        console.log("data save : % ", result);
    }

    createPracticeInfo(title, lenght, fullice, userId)
    {
        const query = `
        INSERT INTO hpg.practiceinfo (title, lenght, fullice, user_id)
        VALUES ('${title}', ${lenght}, ${fullice}, ${userId}) RETURNING practice_id;
        `;

        var t = this.executeQuery(query);
        console.log("t", t);
        return t;
    }

    selectExercice()
    {

    }


    executeQuery(qr)
    {
        this.client.connect();
        var result = null;
        var result = this.client.query(qr, (err, res) => {
            if (err) {
                console.error(err);
                this.client.end();
                
            }
            //res.send(res.rows[0]);
            console.log('Query ran :', qr);
            console.log('Query result :', res.rows[0]);
            //this.client.end();
            return res.rows[0];            
        });
        //console.log('Query result 2:', result);
        
        
        

    }

}







module.exports = {
    dataAccesHK,
  };*/