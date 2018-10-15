const Video = require('./../../schemas/video');

module.exports = async (req, res, next)=>{
    try{
        req.video = await Video.findOne({id: req.params.id}).populate('embeds');
        if(!req.video)
            return res.status(403).json({error:true, message:'Video not exist'});
        next();
    }catch(e){
        res.status(403).json({error:true, message:'video not exist'});
    }
};