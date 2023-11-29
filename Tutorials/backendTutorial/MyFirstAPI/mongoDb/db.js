const mongoose = require('mongoose');
require('dotenv').config();

const dbOptions = {
    dbName: 'film_and_directors', // Your database name here
    useNewUrlParser: true,
    useUnifiedTopology: true
  };

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, dbOptions);
        
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;
