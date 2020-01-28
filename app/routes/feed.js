const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv').config();
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const feed = require('../controllers/feed');
const parseTime = require('../utils/parseTime');

router.get('/', checkAuth, function (req, res, next) {
    let one = `${process.env.APP_URL}/api/userpost/feed`;
    let two = `${process.env.APP_URL}/api/user/infofeed`;
    let three = `${process.env.APP_URL}/api/group/registered?limit=5`;

    let loginUser= req.decodedUser;

    const requestOne = axios.get(one, {
        headers: {
            Cookie: `userToken=${req.cookies.userToken}`
        }
    });
    const requestTwo = axios.get(two, {
        headers: {
            Cookie: `userToken=${req.cookies.userToken}`
        }
    });
    const requestThree = axios.get(three, {
        headers: {
            Cookie: `userToken=${req.cookies.userToken}`
        }
    });

    axios.all([requestOne, requestTwo, requestThree])
        .then(axios.spread((...responses) => {
            const posts = responses[0].data;
            const infoFeed = responses[1].data;
            const groups = responses[2].data;
            const firstName = responses[1].data.fullName.split(" ")[0];

            let now = new Date();

            for (let i in posts) {
                let date = new Date(posts[i].createdAt);

                const timeyears = parseTime.timeYears(date, now);
                const timemonth = parseTime.timeMonth(date, now);
                const timeweeks = parseTime.timeWeeks(date, now);
                const timedays = parseTime.timeDays(date, now);
                const timehours = parseTime.timeHours(date, now);
                const timeminutes = parseTime.timeMinutes(date, now);
                if (timeyears > 0) {
                    posts[i].createdAt = '' + timeyears + ' year' + (timeyears === 1 ? "" : "s")
                } else if (timemonth > 0) {
                    posts[i].createdAt = '' + timemonth + ' month' + (timemonth === 1 ? "" : "s")
                } else if (timeweeks > 0) {
                    posts[i].createdAt = '' + timeweeks + ' week' + (timeweeks === 1 ? "" : "s")
                } else if (timedays > 0) {
                    posts[i].createdAt = '' + timedays + ' day' + (timedays === 1 ? "" : "s")
                } else if (timehours > 0) {
                    posts[i].createdAt = '' + timehours + ' hour' + (timehours === 1 ? "" : "s")
                } else if (timeminutes > 0) {
                    posts[i].createdAt = '' + timeminutes + ' minute' + (timeminutes === 1 ? "" : "s")
                } else {
                    posts[i].createdAt = "Right Now"
                }

            }

            res.render('feed', {
                data: posts,
                groups: groups,
                firstName: firstName,
                infoFeed: infoFeed,
                loginUser: loginUser
            });
        }))
        .catch(error => console.log(error));
});

// Publicar no feed
router.post('/', checkAuth, (req, res) => {
    feed.addToFeed(req.decodedUser)
        .then(result => console.log(result))
        .catch(err => console.log(err));
    res.redirect('/feed');
});

// Gostar de uma publicação
// router.put('/:id', (req, res) => {
//
// });

module.exports = router;