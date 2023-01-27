const errorHandler = (err, req, res, next) => {
    let code = 500
    let message = 'Internal Server Error'
    console.log(err)
  	
    if (err.name === 'SequelizeValidationError') {
      code = 400
      message = err.errors[0].message
    } 
    else if ([
      'Price must be provided.',
      'Orders must be provided.',
      'Table ID must be provided.',
      'Transaction ID must be provided.'
    ].includes(err))  {
      code = 400
      message = err
    }
    else if([
      'Data not found.'
    ].includes(err)) {
      code = 404
      message = err
    }

    res.status(code).json({message})
  }

  module.exports = {errorHandler}