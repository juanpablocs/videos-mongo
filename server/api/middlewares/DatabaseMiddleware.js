const config = require('./../../config');
const mongoose = require('mongoose');
module.exports = async (req, res, next)=>{
    try{
        await mongoose.connect(config.mongo_connection, {});
        console.log('mongodb connected successfull');
        next();
    }catch (e) {
        console.log(e);
        console.log('fucking mongodb not running');
        res.json({error:true, message: 'error to connect database..'});
    }
};