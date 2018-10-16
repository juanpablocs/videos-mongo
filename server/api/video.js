const { Router } = require('express');
const { VideoId } = require('./middlewares');
const Video = require('./../schemas/video');
const Embed = require('./../schemas/embed');

const router = Router();

router.get('/', async (req, res) => {
    try{
        const data = await Video.find({}).populate('embeds', 'embed_url').sort('-created').limit(20);
        return res.json({error:false, message:'ok', data});
    }catch(e){
        console.log('err', e);
    }
    res.status(403).json({ message: 'error' });   
});

router.post('/', async (req, res) => {
    console.log(req.body);
    const {title, idimdb, source} = req.body;
    const id = Math.random().toString(36).substr(2,7);
    
    if(!title)
        return res.status(403).json({error:true, message:'name is required'});
    
    try{
        const video = new Video({id, idimdb, title, source});
        const data = await video.save();
        res.status(201).json({error:false, message:'created successfull', data})
    }catch(e) {
        res.status(403).json({error:true, message:'error to save video', data:e.message});
    }
});

router.get('/:id', VideoId, (req, res) => {
    res.json(req.video);
});

router.put('/:id', VideoId, (req, res) => {
    console.log('update', req.body);
    console.log('video', req.video);
    const {title, idimdb, source} = req.body;
    const id = req.params.id;
    
    if(!title)
        return res.status(403).json({error:true, message:'name is required'});
    
    Video
        .findOne({id})
        .then((video) => {
            video.title = title;
            video.idimdb = idimdb;
            video.source = source
            video
                .save()
                .then(() => {
                    res.jsonp({ error: false, message:'successfull', data:video });
                })
                .catch((e)=>{
                    console.log('error update', e);
                });
        });
});

router.delete('/:id', VideoId, (req, res) => {
    //in progress
});

router.get('/:id/embeds-verify', VideoId, (req, res) => {
    //in progress
});

module.exports = router;