const  mysql =require('mysql2')

const pool =mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database:'telemedicine',
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0,
});

pool.getConnection((err,connection)=>{
    if (err){
        console.error('Error connecting to the database:',err.message);

    }
    else{
        console.log('Connected to the database!');
        connection.release();
    }
});

module.exports=pool.promise();