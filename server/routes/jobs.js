const express = require('express');
const router = express.Router();
const { Job } = require("../models/Job");

const { auth } = require("../middleware/auth");


router.post("/uploadjob", auth, (req, res) => {

    //save all the data we got from the client into the DB 
    const job = new Job(req.body)

    job.save((err) => {
        if (err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })

});

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


router.post("/jobs_by_id", (req, res) => {
    let type = req.query.type
    let productIds = req.query.id

    if (type === "array") {
        let ids = req.query.id.split(',');
        productIds = [];
        productIds = ids.map(item => {
            return item
        })
    }
    
    //we need to find the product information that belong to product Id 
    Job.find({ '_id': { $in: productIds } })
    //.populate('writer')
    .exec((err, product) => {
        if(err) return req.status(400).send(err)
        return res.status(200).send(product)
    })
});


router.post("/jobs_by_company",auth,  (req, res) => {

    let type = req.query.type
    let user = req.query.id

    console.log(user);
    
    Job.find({ 'userpost': user })
    
    .exec((err, product) => {
        if(err) return req.status(400).send(err)
        return res.status(200).send(product)
    })
})

router.post("/removeJob",auth,  (req, res) => {

    let type = req.query.type
    let jobid = req.query.id

    
    
    Job.remove({ '_id': jobid })
    
    .exec((err, product) => {
        if(err) return req.status(400).send(err)
        return res.status(200).send(product)
    })
})



module.exports = router;