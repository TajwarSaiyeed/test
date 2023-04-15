const path = require('path')
const express = require('express')
const cors = require('cors')
const colors = require('colors')
const dotenv = require('dotenv').config()
const CronJob = require('cron').CronJob;
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const { runImport } = require('./logic/import');
const port = process.env.PORT || 5000

connectDB();

//var importJob = new CronJob('00 10 * * * *', runImport);
//importJob.start(); 

const app = express()

var corsOptions = {origin: '*'};
app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/import', require('./routes/importRoutes'))
app.use('/api/orders', require('./routes/orderRoutes'))
app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/notes', require('./routes/noteRoutes'))
app.use('/api/invoices', require('./routes/invoiceRoutes'))
app.use('/api/bags', require('./routes/bagsRoutes'))
//webhook
app.use('/api/webhook', require('./routes/webhookRoutes'))

runImport();
// Serve frontend
//runImport();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  )
} else {
  app.get('/', (req, res) => res.send('Please set to production'))
}

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
