class user{

    async insertUser(client,userData){
        try{
            const query = `INSERT INTO users(email,password,username) VALUES($1,$2,$3) RETURNING *`;
            const data = await client.query(query,[userData.email,userData.password,userData.username]);
            return data.rows[0] ; 
        }catch(error){
            console.log(error);
            throw error ;
        }
    }

}

export default new user();