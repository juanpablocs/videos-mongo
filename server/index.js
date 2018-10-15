const express = require('express');
const cors = require('cors');
const { ApiHome, ApiVideo, ApiEmbed } = require('./api');
const { Database } = require('./api/middlewares');
const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());
app.get('/', ApiHome);
app.use('/video', Database, ApiVideo);
app.use('/embed', Database, ApiEmbed);
app.post('/video-upload', (req, res)=>res.json(['in progress']));
app.get('/verify-schedule',  (req, res)=>res.json(['in progress']));

app.listen(port, ()=>console.log(`run server http://localhost:${port}`));