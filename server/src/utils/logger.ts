import dayjs from "dayjs";
import logger from "pino";

const level =  'info';

// Initialize logger
const log = logger({
    transport: {
        target: 'pino-pretty'
    },
    level,
    base: {
        pid: false
    },
    timestamp: () => `."time": ${dayjs().format()}`
});

export default log;
