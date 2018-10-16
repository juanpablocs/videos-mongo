const Video = require('./../schemas/video');

module.exports = {
    PlayerEmbed: async (req, res)=>{
        const video = await Video.findOne({idimdb: req.params.id}).populate('embeds', 'embed_url');
        if(!video)
            return res.status(403).json({error:true, message:'video not exist'});
        
        console.log(video);
        res.render(__dirname+'/embed', {video})
    }
};