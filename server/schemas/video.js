const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    id: {type: String, unique: true, required: true},
    idimdb: {type: String, unique: true, required: true},
    title: {type: String, unique: true, required: true, dropDups: true},
    source: String,
    embeds : [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Embed' 
    }],
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Video', videoSchema);