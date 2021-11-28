const router = require('express').Router();
const { User, Animation } = require('../db/models');
const Op = require('sequelize');

router.post('/postLottieData', async(req, res) => {
    try {
        const { userData, fileData } = req.body;
        console.log(userData);
        const email = userData.email;
        const username = userData.name;
        const photoUrl = userData.imageUrl;
        const animationJson = fileData;

        const user = await User.findAll({
            where: {
                email :email
            }
        })

        if(user.length != 0) {
            await Animation.create({ email , animationJson});
        } else {
            await User.create({ username, email, photoUrl });
            await Animation.create({ email , animationJson});

            res.json({ username, photoUrl, animationJson });
        }

    } catch(err) {
        console.log(err);
    }
})

router.get('/getLotties/:email', async (req, res) => {
    try {
        const email = req.params.email;

        const user = await User.findAll({
            where: {
                email: email
            }
        })

        const animation = await Animation.findAll({
            where: {
                email: email,
            }
        })
        res.json({user, animation})
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;