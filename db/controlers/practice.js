var pi = require('../models/practiceInfo.js');
var prtDet = require('../models/practiceDetails.js')

class Practice
{
    
    constructor(){
       this.prtInfo = new pi.PracticeInfo();
       this.prtDet = new prtDet.PracticeDetails();
       this.exercicesArray = [];
    }

     create(req, res) {
    
       console.log("*** pratice.js - create function **");

        const {
            title,
            lenght,
            fullIce,
            userId    
            } = req.body;

       
        console.log("***  titre de la pratique **", title);
        
       this.prtInfo.CreatePracticeInfo(title,lenght,fullIce,userId).then( (value) => this.selectExercices(value, lenght));
       // console.log("***  Retour insert **", result);
  
    
  }
  
    selectExercices(practiceID, prtLenght)
    {
        console.log("***  selectExercices **", prtLenght);
        const minPerExercice = 10;
        const nbExercices = Math.floor(prtLenght/minPerExercice);
        console.log("***  nbExercices **", nbExercices);
        const availableExe = this.prtDet.getExercices();
        for (let i=0; i<= nbExercices-1; i++)
        {
            
          //  this.prtDet.pickExercices(practiceID, this.exercicesArray).then((value) => this.insertExercice(practiceID, value));
        }     
        
        console.log("Exercices : ", this.exercicesArray);
    }

    insertExercice(practiceId, exerciceId)
    {
        this.exercicesArray.push(exerciceId);
        console.log("insertExercice : ", this.exercicesArray);
    }

}

module.exports = {
    Practice
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