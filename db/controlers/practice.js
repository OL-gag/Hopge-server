var practiceInfo = require('../models/practiceInfo.js');
var practiceDetails = require('../models/practiceDetails.js');
var exercices = require('../models/exercices.js')
const {generateUniqueNumbers} = require('../../helpers/uniqueNumbers.js');


const Practice = 
{
    
   /* constructor(){
       this.prtInfo = new practiceInfo.PracticeInfo();
       this.prtDet = new practiceDetails.PracticeDetails();
       this.prtExer = new exercices.Exercices();

       this.exercicesArray = [];
    }*/

    async createPractice(req, res) {
    
        console.log("*** pratice.js - create function **");

        const {
            title,
            lenght,
            fullIce,
            userId    
            } = req.body;


        console.log("***  titre de la pratique **", title);

        var prtInfo = new practiceInfo.PracticeInfo();
        var result =  await prtInfo.CreatePracticeInfo(title,lenght,fullIce,userId);
        var practiceId = result[0].practice_id;
        //selectExercices(result[0].practice_id, lenght);
        SelectExercicesF(lenght, practiceId);
          
        //console.log("Exercices : ", this.exercicesArray);
        res.json("completed");
    },        

  /*  async selectExercices(practiceId, prtLenght)
    {
        console.log("***  selectExercices **", prtLenght);
        const minPerExercice = 10;
        const nbExercices = Math.floor(prtLenght/minPerExercice);
        console.log("***  nbExercices **", nbExercices);
        this.prtExer.getAllExercices().then((value) => {
            this.exercicesArray = generateUniqueNumbers(nbExercices,value.length); // *** Should add more robust and sophisticated exercice selector.
            this.prtDet.insert(practiceId, this.exercicesArray);
        })
          
        console.log("Exercices : ", this.exercicesArray);
    },
*/

    async getPratice(req, res) {
        
        var pd = new practiceDetails.PracticeDetails();
        var  x = await pd.getPracticeDetails(req.body.practice_id);
        
        var ex = new exercices.Exercices();
        var y = await ex.getAllExercices(x);

        res.json(y);
        
        //return x;
        
    }

}

module.exports = {
    Practice
  };

function SelectExercicesF(lenght, practiceId) {
    console.log("***  selectExercices **", lenght);
    const minPerExercice = 10;
    const nbExercices = Math.floor(lenght / minPerExercice);
    console.log("***  nbExercices **", nbExercices);
    var exer = new exercices.Exercices();
    exer.getAllExercices().then((value) => {
        var exercicesArray = generateUniqueNumbers(nbExercices, value.length); // *** Should add more robust and sophisticated exercice selector.
        var prtDet = new practiceDetails.PracticeDetails();
        prtDet.insert(practiceId, exercicesArray);
    });
}
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