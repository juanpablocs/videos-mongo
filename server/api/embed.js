const { Router } = require('express');
const { VideoId } = require('./middlewares');
const Embed = require('./../schemas/embed');
const Video = require('./../schemas/video');

const router = Router();

router.get('/', async (req, res) => {
    try{
        const data = await Embed.find({}).populate('video', 'id name source').sort('-created').limit(20);
        return res.json({error:false, message:'ok', data});
    }catch(e){
        console.log('err', e);
    }
    res.status(403).json({ message: 'error' });   
});

router.post('/', async (req, res) => {
    const {id_video, server, embed_id, embed_url, status} = req.body;

    try{
        const video = await Video.findOne({id: id_video});
        if(!video)
            return res.status(403).json({error:true, message:'video not exist'});
        
        const embed = new Embed({server, embed_id, embed_url, status, video:video._id});
        const data = await embed.save();

        video.embeds.push(data._id);
        await video.save();

        res.status(201).json({error:false, message:'created successfull', data})
    }catch(e) {
        res.status(403).json({error:true, message:'error to save embed', data:e.message});
    }
});


router.put('/:id', async (req, res) => {
    const {id_video, server, embed_id, embed_url, status} = req.body;
    const id = req.params.id;
    try{
        const video = await Video.findOne({id: id_video});
        if(!video)
            return res.status(403).json({error:true, message:'video not exist'});
        
            Embed
            .findOne({_id: id})
            .then((embed) => {
                embed.embed_url = embed_url;
                embed
                    .save()
                    .then(() => {
                        res.jsonp({ error: false, message:'edited successfull', embed });
                    })
                    .catch((e)=>{
                        console.log('error update', e);
                        res.status(403).json({error:true, 'message':'error to embed'})
                    });
            });
    }catch(e) {
        res.status(403).json({error:true, message:'error to update embed', data:e.message});
    }
});

module.exports = router;