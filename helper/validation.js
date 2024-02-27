const schemaValidation = (schema) => async (req,res,next)=>{

    try{
        console.log(req.body);
        const { error } = schema.validate(req.body,{ abortEarly : false });
        if(error){
            return res.status(400).json(error);
        }
        next();
    }catch(error){
        return res.status(500).json(error);
    }
}

export { schemaValidation };