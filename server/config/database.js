const mongoose = require('mongoose');

const connectDatabase = async()=>{
    await mongoose.connect(process.env.MONGO_URL)
        console.log("Database connected successfully !!!")
    
}

// exports.connectDatabase = connectDatabase()

module.exports = connectDatabase;

