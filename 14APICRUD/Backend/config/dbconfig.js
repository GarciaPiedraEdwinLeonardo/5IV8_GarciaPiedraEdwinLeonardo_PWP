import mysql2 from 'mysql2';
import dotenv from 'dotenv';

//Si vamos a tener una base de datos en servidor debemos de agregar lo siguiente
//import (fileURLToPath) from 'url';

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

//dotenv.config({path: path.resolve(__dirname, '../.env')})
dotenv.config();

const config = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: 'n0m3l0',
    database: 'curso',

    //connectionLimit: 10,
    //acquireTimeout: 30000,
    //idleTimeout: 30000
});

config.getConnection((err) => {
    if(err){
        console.log("Error de conexion a la base de datos, " + err);
        return;
    }

    console.log('Conexion exitosa de la base de datos');
    connection.release();
});