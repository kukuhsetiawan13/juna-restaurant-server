const express = require('express')
const app = express()
const port = 3000

const routes = require('./routes')
const {errorHandler} = require('./middlewares/errorHandler')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(routes)


// error handler
app.use(errorHandler)
  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
  



  
  
  
  
  