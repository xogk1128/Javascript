const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../Utils/ExpressError');
const Campground = require('../models/campground');
const { campgroundSchema} = require('../schemas')

const validateCampground = (req, res, next) => {
    const {error} = campgroundSchema.validate(req.body);
    if(error){
        const result = error.details.map(el => el.message).join(',');
        throw new ExpressError(result.error.details, 400);
    } else {
        next();
    }
}

router.get('/', catchAsync(async (req, res)=>{
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
}));

router.get('/new', catchAsync(async (req, res)=>{
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/new', {campground});
}));

router.post('/', validateCampground, catchAsync(async (req, res)=>{
    //if(!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
    const campground = new Campground(req.body.campground);
    await campground.save();
    req.flash('success', 'Successfully made a new Campground!');
    res.redirect(`/campgrounds/${campground._id}`);
}));

router.get('/:id', catchAsync(async (req, res)=>{
    const campground = await Campground.findById(req.params.id).populate('reviews');
    res.render('campgrounds/show', {campground});
}));

router.get('/:id/edit', catchAsync(async (req, res)=>{
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', {campground});
}));

router.put('/:id', catchAsync(async (req, res)=>{
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground}, {new : true});
    res.redirect(`/campgrounds/${campground._id}`);
}));

router.delete('/:id', catchAsync(async (req, res)=>{
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect(`/campgrounds`);
}));

module.exports = router;