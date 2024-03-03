
import { format, transports, createLogger } from 'winston';
// import 'winston-daily-rotate-file';
const { combine, timestamp, printf, label, colorize ,errors} = format;
const { Console, File } = transports;

import path from 'path';

const logFormat = printf(({level , label , message , timestamp }) => {
    const mainFilename = require.main?.filename;
    const baseName = mainFilename ? path.basename(mainFilename) : 'unknown'
    return `${timestamp}  -> [${label} > ${baseName}] @ ${level} : ${message}`;
})

const setVerboseOptions = (labelStr : string) => {
    return {
        filename : "./logs/DevLogs.log",
        level : 'debug',
        format : combine(
            timestamp(),
            label({label : labelStr}),
            errors({ stack: true }), 
            logFormat,
        )
    }
}

const setConsoleOptions = (labelStr : string) => {
    return {
        filename : './logs/DevLogs.log',
        level : 'silly',
        format : combine(
            colorize(),
            timestamp(),
            label({label : labelStr}),
            errors({ stack: true }), 
            logFormat,
        )
    }
}

const loggerCreate = (labelStr : string) => {
    const transportsOptions = {
        console : new Console(setConsoleOptions(labelStr)),
        file: new File(setVerboseOptions(labelStr)),
    }
    return createLogger({
        transports : [
            transportsOptions.console,
            transportsOptions.file
        ]
    })

}

// Export an instance of the logger
export default loggerCreate("Dev_App");

//export the function itself if  want to create multiple instances
export { loggerCreate };
