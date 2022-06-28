const autocannon = require('autocannon');
const { PassThrough } = require('stream');      
const logger = require('./logger.js');

const run = (url) => {
    const buf = [];
    const outputStream = new PassThrough();

    const inst = autocannon({
        url,
        connections: 100,
        duration: 20
    })

    autocannon.track(inst, { outputStream });

    outputStream.on('data', data => buf.push(data));
    inst.on('done', () => {
        process.stdout.write(Buffer.concat(buf));
    });
}

logger.info('Starting test');
run('http://localhost:8080/api/info'); 
