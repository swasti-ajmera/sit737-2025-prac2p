// localhost:3040/add?n1=4&n2=298
const express = require("express");
const winston = require("winston");
const fs = require('fs');
const res = require("express/lib/response");
const app = express();

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: {service: 'calculator-service'},
    transports: [
        //
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      //
        new winston.transports.File({filename: 'error.log', level: 'error'}),
        new winston.transports.File({filename: 'combined.log'}),
    ],
});

 //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  //

if(process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

const add = (n1, n2) => {
    return n1+n2;
}

const sub = (n1, n2) => {
    return n1-n2;
}

const mul = (n1, n2) => {
    return n1*n2;
}

const div = (n1, n2) => {
    return n1/n2;
}

app.get("/add", (req,res)=>{
    try{
    const n1 = parseFloat(req.query.n1);
    const n2 = parseFloat(req.query.n2);
    if(isNaN(n1)) {
        logger.error("n1 is incorrectly defined");
        throw new Error("n1 incorrectly defined");
    }
    if(isNaN(n2)) {
        logger.error("n2 is incorrectly defined");
        throw new Error("n2 incorrectly defined");
    }
    
    if (n1 === NaN && n2 === NaN) {
        console.log()
        throw new Error("Parsing Error");
    }
    logger.info('Parameters '+n1+' and '+n2+' received for addition');
    const result = add(n1,n2);
    res.status(200).json({statuscode:200, data: result }); 
    } catch(error) { 
        console.error(error)
        res.status(500).json({statuscode:500, msg: error.toString() })
      }
});

app.get("/sub", (req, res) => {
    try{
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        if(isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            throw new Error("n1 incorrectly defined");
        }
        if(isNaN(n2)) {
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 incorrectly defined");
        }
        
        if (n1 === NaN && n2 === NaN) {
            console.log()
            throw new Error("Parsing Error");
        }
        logger.info('Parameters '+n1+' and '+n2+' received for subtraction');
        const result = sub(n1, n2);
        res.status(200).json({statuscode:200, data: result});
    } catch(error) {
        console.log(error)
        res.status(500).json({statuscode:500, msg: error.toString()})
    }
});

app.get("/mul", (req, res) => {
    try{
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        if(isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            throw new Error("n1 incorrectly defined");
        }
        if(isNaN(n2)) {
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 incorrectly defined");
        }
        
        if (n1 === NaN || n2 === NaN) {
            console.log()
            throw new Error("Parsing Error");
        }
        logger.info('Parameters '+n1+' and '+n2+' received for multiplication');
        const result = mul(n1, n2);
        res.status(200).json({statuscode:200, data: result});
    } catch(error) {
        console.log(error)
        res.status(500).json({statuscode:500, msg: error.toString()})
    }
});

app.get("/div", (req, res) => {
    try{
        const n1 = parseFloat(req.query.n1);
        const n2 = parseFloat(req.query.n2);
        if(isNaN(n1)) {
            logger.error("n1 is incorrectly defined");
            throw new Error("n1 incorrectly defined");
        }
        if(isNaN(n2)) {
            logger.error("n2 is incorrectly defined");
            throw new Error("n2 incorrectly defined");
        }
        
        if (n1 === NaN || n2 === NaN) {
            console.log()
            throw new Error("Parsing Error");
        }
        logger.info('Parameters '+n1+' and '+n2+' received for division');
        const result = div(n1, n2);
        res.status(200).json({statuscode:200, data: result});
    } catch(error) {
        console.log(error)
        res.status(500).json({statuscode:500, msg: error.toString()})
    }
});

const port = 3000;
app.listen(port, () => {
    console.log("Hello I'm listening to port " +port);
})