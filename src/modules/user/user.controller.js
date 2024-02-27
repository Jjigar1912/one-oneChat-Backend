import userService from "./user.service.js";

class UserController
{
    async insertUser(req,res){

        try{

            const response = await userService.insertUser(req.body);
            return res.status(response.status).json(response);

        }catch(error){

            console.log(error);
            return res.status(500).json(error);

        }

    }

}

export default new UserController();