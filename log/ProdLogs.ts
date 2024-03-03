import { format, transports, createLogger } from 'winston';
// import 'winston-daily-rotate-file';
const { combine, timestamp, printf, label, colorize ,errors} = format;
const { Console, File } = transports;

import path from 'path';

const  logFormat = printf(({ level, message, label, timestamp }) => {
    const mainFilename = require.main?.filename;
    const  filename = mainFilename ? path.basename(mainFilename) : "unknown";
    return `${timestamp} =>  [${label} > ${filename}] @ ${level} : ${message}`;
})

const setConsoleOptions = (labelStr : string) => {
    return {
        filename : './logs/ProdLog.log',
        level : 'info',
        combine : (
            timestamp(),
            label({label : labelStr}),
            logFormat
        )
    }
}

const setVerboseOptions = (labelStr : string) => {
    return {
        filename : './logs/ProdLog.log',
        level : 'info',
        combine : (
            timestamp(),
            label({label : labelStr}),
            logFormat
        )
    }
}

const loggerCreate = (labelStr : string) => {
    const transportsOptions = {
        console : new Console(setConsoleOptions(labelStr)),
        file : new File(setVerboseOptions(labelStr))
    }
    return createLogger({
        transports : [
            transportsOptions.console,
            transportsOptions.file
        ]
    });
}

// Export an instance of the logger
export default loggerCreate("Prod_App");

//export the function itself if  want to create multiple instances
export { loggerCreate };