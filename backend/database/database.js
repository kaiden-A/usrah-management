import mysql from 'mysql2/promise';

async function connectDb(){

    const db = await mysql.createConnection({
        host : process.env.MYSQL_HOST,
        user : process.env.MYSQL_USER,
        password : process.env.MYSQL_PASSWORD,
        database : process.env.MYSQL_DB,
        port : process.env.MYSQL_PORT
    })

    console.log("Connected to database")

    return db;
}

export default connectDb;