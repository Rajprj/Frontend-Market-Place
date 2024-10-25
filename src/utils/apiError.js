class apiError extends Error{
    constructor(
        statuscode,
        message = "Somthing went wrong !",
        stack = "",
        errors = []
    ){
        super(message)
        this.statuscode = statuscode
        this.message = message
        this.data = null
        this.stack = stack
        this.errors = errors
        this.success = false

        if(!stack){
            Error.captureStackTrace(this, this.constructor)
        }
        else{
            this.stack = stack
        }
    }
}

export {apiError}