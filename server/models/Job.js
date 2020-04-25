var mongoose = require('mongoose');
const Schema = mongoose.Schema;

  var jobSchema = mongoose.Schema({
    title:  {
        type: String,
        required: true
    }, // String is shorthand for {type: String}
    typeJob: {
        type: String,
        required: true
    }, //remoto, pasantia, partTime
    description: {
        type: String,
        required: true
    }  ,
    date: { type: Date, default: Date.now },
    benefits: String,
    requeriments: String ,
    url: {
        type: String,
        required: true
    }, // como aplicar??
    tags: Array,
    company: {
        type: String,
        required: true
    },
    photoCompany: String,
    userpost: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    
  });
const Job = mongoose.model('Job', jobSchema);

module.exports = { Job }