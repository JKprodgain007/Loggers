import { format, transports, createLogger } from "winston";
// import 'winston-daily-rotate-file';
const { combine, timestamp, printf, label, colorize, errors } = format;
const { Console, File } = transports;

import path from "path";

const shortenFilePath = (filePath: string): string => {
  const parts = filePath.split(path.sep);
  if (parts.length <= 3) return filePath;
  return path.join(
    parts[parts.length - 3],
    parts[parts.length - 2],
    parts[parts.length - 1]
  );
};

const logFormat = printf(({ level, message, label, timestamp }) => {
  const mainFilename = require.main?.filename;
  const filename = mainFilename ? shortenFilePath(mainFilename) : "unknown";
  return `${timestamp} =>  [${label} > ${filename}] @ ${level} : ${message}`;
});

const indianTimestamp = format((info, opts) => {
  if (opts.tz)
    info.timestamp = new Date().toLocaleString("en-IN", { timeZone: opts.tz });
  else info.timestamp = new Date().toLocaleString("en-IN");
  return info;
});

const setConsoleOptions = (labelStr: string) => {
  return {
    level: "info",
    format: combine(
      indianTimestamp({ tz: "Asia/Kolkata" }),
      label({ label: labelStr }),
      logFormat
    ),
  };
};

const setVerboseOptions = (labelStr: string) => {
  return {
    filename: "./logs/ProdLog.log",
    level: "info",
    format: combine(
      indianTimestamp({ tz: "Asia/Kolkata" }),
      label({ label: labelStr }),
      logFormat
    ),
  };
};

const log = (labelStr: string) => {
  const transportsOptions = {
    console: new Console(setConsoleOptions(labelStr)),
    file: new File(setVerboseOptions(labelStr)),
  };
  return createLogger({
    transports: [transportsOptions.console, transportsOptions.file],
  });
};

// Export an instance of the logger
export default log("Prod_App");

//export the function itself if  want to create multiple instances
export  {log};