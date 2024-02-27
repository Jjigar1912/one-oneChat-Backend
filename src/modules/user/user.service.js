import user from '../user/user.dal.js';
import pool from '../../../config/db.js';

class userService
{
    async insertUser(userData){
        
        const client = await pool.connect();
        try{
            const data = await user.insertUser(client,userData);
            const response = {
                status : 201 , 
                message : 'User Created Successfully' ,
                data : data.id , 
            }
            return response;
        }catch(error){
            throw error ;
        }finally{
            await client.release();
        }
    
    }

}

export default new userService();