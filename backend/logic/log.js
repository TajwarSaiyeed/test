const Log = require('../models/logModel');


async function addLog(type, content) {
    console.log(type + ':' + content);
    /*
    try {
        const log = new Log({
            type: type,
            content: content
        });

        await log.save(function (err) {
            if (err) {
                console.log(err);
            }
        });

    } catch (err) {
        console.log(err.message);
    }
    */
}


module.exports = {
    addLog
}