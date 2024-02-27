import Joi from 'joi'; 

const user = Joi.object({
    email : Joi.string().trim().required() , 
    password : Joi.string().trim().required() , 
    username : Joi.string().trim().required()
})

export { 
    user
}