const express = require('express');
const jwt = require('jsonwebtoken');
const Event = require('../models/Event');
const Favorite = require('../models/Favorite');
const router = express.Router();

// Get events
router.post('/list', async (req, res) => {
  try {
    var token = req.body.token;
    var userId = null;
    if(token != null){
        userId = jwt.verify(token, process.env.JWT_SECRET).userId;
    }
    const events = await Event.find();
    const favorites = await Favorite.find({user: userId});
    if(token != null){
        events.forEach((event) => {
            favorites.forEach((favorite) => {
                if(favorite.event.equals(event._id)){
                    event.isFavorite = true;
                }else{
                    event.isFavorite = false;
                }
            });
        });
    }
    res.json(events);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get favorites
router.post('/favoritelist', async (req, res) => {
  try {
    var token = "";
    if(req.body.token != "") token = req.body.token;
    const userId = jwt.verify(token, process.env.JWT_SECRET).userId;
    const events = await Event.find();
    const favorites = await Favorite.find({user: userId});
    var favoriteEvents = [];
    events.forEach((event) => {
        favorites.forEach((favorite) => {
            if(favorite.event.equals(event._id)){
                favoriteEvents.push(event);
            }
        });
    });
    res.json(favoriteEvents);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Favorite event
router.post('/favorite', async (req, res) => {
  try {
    var token = "";
    if(req.body.token != "") token = req.body.token;
    const userId = jwt.verify(token, process.env.JWT_SECRET).userId;
    const exists = await Favorite.findOne({user: userId, event: req.body.event});
    if(exists){
        await Favorite.findByIdAndDelete(exists._id);
    }else{
        const favorite = new Favorite({
            user: userId,
            event: req.body.event
        });
        await favorite.save();
    }
    res.status(201).send('Favorite toggled successfully!');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;