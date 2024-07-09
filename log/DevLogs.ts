import { format, transports, createLogger } from 'winston';
// import 'winston-daily-rotate-file';
const { combine, timestamp, printf, label, colorize, errors } = format;
const { Console, File } = transports;

import path from 'path';

const shortenFilePath = (filePath: string): string => {
    const parts = filePath.split(path.sep);
    if (parts.length <= 3) return filePath;
    return path.join(parts[parts.length - 3], parts[parts.length - 2], parts[parts.length - 1]);
};

const indianTimestamp = format((info, opts) => {
    if(opts.tz)
        info.timestamp = new Date().toLocaleString('en-IN', { timeZone: opts.tz });
    else
        info.timestamp = new Date().toLocaleString('en-IN');
    return info;
});

const logFormat = printf(({level, label, message, timestamp }) => {
    const mainFilename = require.main?.filename;
    const shortenedPath = mainFilename ? shortenFilePath(mainFilename) : 'unknown';
    return `${timestamp}  -> [${label} > ${shortenedPath}] @ ${level} : ${message}`;
});

const setVerboseOptions = (labelStr: string) => {
    return {
        filename: "./logs/DevLogs.log",
        level: 'debug',
        format: combine(
            indianTimestamp({ tz: 'Asia/Kolkata' }),
            label({label: labelStr}),
            errors({ stack: true }), 
            logFormat,
        )
    };
};

const setConsoleOptions = (labelStr: string) => {
    return {
        level: 'silly',
        format: combine(
            colorize(),
            indianTimestamp({ tz: 'Asia/Kolkata' }),
            label({label: labelStr}),
            errors({ stack: true }), 
            logFormat,
        )
    };
};

const loggerCreate = (labelStr: string) => {
    const transportsOptions = {
        console: new Console(setConsoleOptions(labelStr)),
        file: new File(setVerboseOptions(labelStr)),
    };
    return createLogger({
        transports: [
            transportsOptions.console,
            transportsOptions.file
        ]
    });
};

// Export an instance of the logger
export default loggerCreate("Dev_App");

//export the function itself if  want to create multiple instances
export { loggerCreate };