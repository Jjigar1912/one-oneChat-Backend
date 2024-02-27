import pg from 'pg' ; 

const Pool = pg.Pool ;

const pool = new Pool({
    user : 'postgres' ,
    database : 'chatApp',
    port: 5432 ,
    host: 'localhost' , 
    password : 'Jig@r1234'
})

export default pool ; 