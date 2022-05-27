const express = require('express')
const winston = require('winston')
const app = express()

// Heroku dynamically sets a port
const PORT = process.env.PORT || 5000

const logger = winston.createLogger({
  level: process.env === 'development' ? 'debug' : 'info',
  format: winston.format.combine(
    process.env === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ['error'],
    })
  ]
})

app.use(express.static('dist'))

app.listen(PORT, () => {
  logger.info('server started on port 5000')
})
