const mongoose= require("mongoose");
const dotenv=require("dotenv");

dotenv.config();

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI, {
        });
        console.log("Sucessfully connected to MongoDB!")
    } catch(err){
        console.error("Failed to connect to MongoDB, Error:",err.message)
        process.exit(1)
    }
};


module.exports = connectDB;