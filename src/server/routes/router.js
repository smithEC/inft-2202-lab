import express from 'express';

const router = express.Router();
export default router;


router.get('/', (req,res,next) => {
    console.log('got the index request!!');
    res.send('got the index')
});

router.post('/', (req,res,next) => {
    console.log('got the index request!!');
    const body = {
        key: 'value',
        things: ['stuff', 'Stuff','stuff'],
        url: req.url,
        method: req.method
    }
    res.json(body);
});