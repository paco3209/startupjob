const express = require('express');
const router = express.Router();
const { Job } = require("../models/Job");

const { auth } = require("../middleware/auth");


router.post("/uploadjob", auth, (req, res) => {

    //save all the data we got from the client into the DB 
    const job = new Job(req.body)

    job.save((err) => {
        if (err) returnres.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })

});

// Get jobs. Under construcction. No se que hace pero no tocarrrrrrr!!!!!
router.post("/getjobs", (req, res) => {

    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);

    let findArgs = {};
    let term = req.body.searchTerm;

    for (let key in req.body.filters) {

        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    

    if (term) {
        Job.find(findArgs)
            .find({ $text: { $search: term } })
            //.populate("writer")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, products) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true, products, postSize: products.length })
            })
    } else {
        Job.find(findArgs)
           // .populate("writer")
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, products) => {
                if (err) return res.status(400).json({ success: false, err })
                res.status(200).json({ success: true, products, postSize: products.length })
            })
    }

});



module.exports = router;