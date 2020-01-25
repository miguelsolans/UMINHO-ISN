const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv').config();
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const feed = require('../controllers/feed');


function timeMinutes(d1, d2) {
    var diff = Math.abs(d1 - d2)
    return Math.floor((diff / 1000) / 60);
}

function timeHours(d1, d2) {
    return parseInt(Math.abs(d1 - d2) / (60 * 60 * 1000));
}

function timeDays(d1, d2) {
    var t2 = d2.getTime();
    var t1 = d1.getTime();

    return parseInt((t2 - t1) / (24 * 3600 * 1000));
}

function timeWeeks(d1, d2) {
    var t2 = d2.getTime();
    var t1 = d1.getTime();

    return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
}

function timeMonth(d1, d2) {
    var d1Y = d1.getFullYear();
    var d2Y = d2.getFullYear();
    var d1M = d1.getMonth();
    var d2M = d2.getMonth();

    return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
}


function timeYears(d1, d2) {
    return d2.getFullYear() - d1.getFullYear();
}




router.get('/', checkAuth, function (req, res, next) {
    let one = `${process.env.APP_URL}/api/userpost/feed`;
    let two = `${process.env.APP_URL}/api/user/infofeed`;
    let three = `${process.env.APP_URL}/api/user/groups`;

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

            let now = new Date()

            //console.log(posts);

            for (var i in posts) {
                let date = new Date(posts[i].createdAt)

                const timeyears = timeYears(date, now)
                const timemonth = timeMonth(date, now);
                const timeweeks = timeWeeks(date, now);
                const timedays = timeDays(date, now);
                const timehours = timeHours(date, now);
                const timeminutes = timeMinutes(date, now);
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

                if (posts[i].Comments[0].InfoComment[0] === undefined) {
                    posts[i].Comments = []
                }
            }

            res.render('feed', {
                data: posts,
                infoFeed: infoFeed,
                groups: groups,
                firstName: firstName
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