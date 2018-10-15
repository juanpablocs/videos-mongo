module.exports = {
    ApiVideo: require('./video'),
    ApiEmbed: require('./embed'),
    ApiHome: (req, res)=>res.json(['Cocolabs Inc', '', '/video', '/embed'])
}; 
