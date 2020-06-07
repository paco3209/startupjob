const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    //mongoURI: "mongodb://127.0.0.1:27017/job"
    
    mongoURI: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-porvz.mongodb.net/test?retryWrites=true&w=majority`
    
  }
  