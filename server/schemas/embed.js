const mongoose = require('mongoose');

const embedSchema = mongoose.Schema({
    server: String,
    video: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Video'
    },
    embed_id: String,
    embed_url: String,
    status: Number,
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Embed', embedSchema);