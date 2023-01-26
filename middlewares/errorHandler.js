const errorHandler = (err, req, res, next) => {
    let code = 500
    let message = 'Internal Server Error'
    console.log(err)
  	
    if (err.name === 'SequelizeValidationError') {
      code = 400
      message = err.errors[0].message
    } else if (err === 'Price must be provided!' || err === 'Orders must be provided!' || err === 'Table ID and Transaction ID must be provided!')  {
      code = 400
      message = err
    }

    res.status(code).json({message})
  }

  module.exports = {errorHandler}