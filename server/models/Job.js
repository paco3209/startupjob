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
    category :{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }  ,
    images: {
        type: Array,
        default: []
    },
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

  jobSchema.index({ 
    title:'text',
    category: 'text',
    description: 'text'
    
}, {
    weights: {
        name: 5,
        category: 1,
        description: 2
        
    }
})

const Job = mongoose.model('Job', jobSchema);

module.exports = { Job }