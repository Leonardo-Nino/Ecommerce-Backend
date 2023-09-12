import winston from 'winston'

const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: 'magenta',
    error: 'red',
    warning: 'yellow',
    info: 'blue',
    http: 'yellow',
    debug: 'green',
  },
}

winston.addColors(customLevels.colors)

export const loggerDev = winston.createLogger({
  level: 'debug',
  levels: customLevels.levels,
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.simple()
  ),
  transports: [new winston.transports.Console()],
})

export const loggerProduction = winston.createLogger({
  level: 'warning',
  levels: customLevels.levels,
  format: winston.format.combine(
    winston.format.colorize({ all: true }), //all true is for both title and description text color
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'Error.log', level: 'error' }),
  ],
})
