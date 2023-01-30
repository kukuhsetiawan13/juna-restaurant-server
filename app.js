if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const routes = require('./routes')
const {errorHandler} = require('./middlewares/errorHandler')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(routes)


// error handler
app.use(errorHandler)
  

module.exports = app
  



  
  
  
  
  