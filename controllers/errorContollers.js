const ErrorClass = require("../utils/errClass")

handleDuplicateKeyError=err=> new ErrorClass(" your email is already exits", 400)
handleTokenExpiredError=errr=> new ErrorClass (" yoru token is expire login again", 401)
handleJsonWebTokenError=(error)=>new ErrorClass(" Your token signature in not valid please login again",401)
contorolCastError=(err)=>{
    const message= `not found ${err.stringValue}  in a ${err.path}`
    return new ErrorClass(message ,404)
}
errorForProduction = (res, err) => {

    if (err.isOperation) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        })
    }else{
        res.status(500).json({
            status: "error",
            message:"some going very wrong",
            error:err,
        })
    }
}

const ErrorHandler = (err, req, res, next) => {
    const message=err.message
    err.statusCode = err.statusCode || 500
    err.status = err.status || "error";
    err.message=message || "some thing going wrong"
    console.log(err)
        let error =JSON.parse(JSON.stringify(err))
       error.message= message
        if(error.name==="CastError") error=contorolCastError(error,next)
        if(error.name==="JsonWebTokenError") error=handleJsonWebTokenError(error)
        if(error.name==="TokenExpiredError") error=handleTokenExpiredError(error)  
        if(error.code==11000) error=handleDuplicateKeyError(error)        
        errorForProduction(res, error)
    
}
module.exports = ErrorHandler