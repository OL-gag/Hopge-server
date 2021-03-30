

module.exports.generateUniqueNumbers = function(nb, maxLimit)
{
    let col = [];
    if ( nb <= maxLimit )
    {
        while (col.length < nb) { 
            let noExercices = Math.ceil(Math.random() * maxLimit);
            if ( !col.includes(noExercices) )
            {
                col.push(noExercices);
            }
          }

    }

     return col;
}