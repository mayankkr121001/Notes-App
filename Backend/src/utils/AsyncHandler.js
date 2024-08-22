
// const AsyncHandler = (requestHandler) =>{
//     return(req, res, next) =>{
//         Promise.resolve(requestHandler(req, res, next))
//         .catch((err) => next(err))
//     }
// }



const  AsyncHandler = (fn) => async (req, res, next) => {
    try{
        await fn(req, res, next)
    }catch(error){
        return res.status(error.statusCode || 500).json({
            success: false,
            statusCode: error.statusCode,
            message: error.message
        })
    }
}
// THIS CATCH BLOCK IS GIVING ERROR - Cannot set headers after they are sent to the client

export {AsyncHandler}