
class CostumError extends Error{
    constructor(message, errorCode){
        super(message);
        this.statusCode=errorCode
        this.message=message
        this.status=`${errorCode}`.startsWith("4") ? "fail": "error"
        this.isOperation = true
        Error.captureStackTrace(this, this.constructor)
    }

}

module.exports= CostumError