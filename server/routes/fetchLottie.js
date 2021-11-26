const router = require('express').Router();
const multer = require('multer');
const upload = multer();

router.post('/postLottieData', upload.single('lottieFile') ,async(req, res) => {
    console.log(req.file);
    console.log(req.body)
})

module.exports = router;