
const { Client } = require('pg');

class dataAccesHK
{
    client = null;

    constructor(){
        
        this.client = new Client({
            user: 'hk',
            host: 'localhost',
            database: 'hopge',
            password: 'hockey',
            port: 5432,
        });
        

    }
    
    savePractice(titre)
    {
       

        const query = `
            INSERT INTO practiceinfo (title, lenght, fullice)
            VALUES ('${titre}', 60, true)
            `;

        this.executeQuery(query);

        console.log("data save : %", titre);
    }

    executeQuery(qr)
    {
        this.client.connect();

        this.client.query(qr, (err, res) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Data insert successful');
            console.log(res.query);
            this.client.end();
        });

    }

}







module.exports = {
    dataAccesHK,
  };