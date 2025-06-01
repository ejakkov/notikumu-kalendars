const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
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
            // Set isFavorite to true if any favorite matches this event
            event.isFavorite = favorites.some(favorite => String(favorite.event) === String(event._id));
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
            if(String(favorite.event) === String(event._id)){
                favoriteEvents.push(event);
            }
        });
    });
    res.json(favoriteEvents);
  } catch (error) {
    console.error('Error in /favoritelist:', error);
    res.status(400).json({ error: error.message, details: error });
  }
});

// Favorite event
router.post('/favorite', async (req, res) => {
  try {
    var token = "";
    if(req.body.token != "") token = req.body.token;
    const userId = jwt.verify(token, process.env.JWT_SECRET).userId;
    
    // Convert string ID to ObjectId if needed
    const eventId = req.body.event;

    const exists = await Favorite.findOne({user: userId, event: eventId});
    if(exists){
        await Favorite.findByIdAndDelete(exists._id);
        res.status(200).json({ message: 'Favorite removed successfully!' });
    }else{
        const favorite = new Favorite({
            user: userId,
            event: eventId
        });
        await favorite.save();
        res.status(201).json({ message: 'Favorite added successfully!' });
    }
  } catch (error) {
    console.error('Error in favorite endpoint:', error);
    res.status(400).json({ error: error.message });
  }
});

// Check favorite status
router.post('/favorite/check', async (req, res) => {
  try {
    var token = "";
    if(req.body.token != "") token = req.body.token;
    const userId = jwt.verify(token, process.env.JWT_SECRET).userId;
    
    // Convert string ID to ObjectId if needed
    const eventId = req.body.event;

    const exists = await Favorite.findOne({user: userId, event: eventId});
    res.json({ isFavorite: !!exists });
  } catch (error) {
    console.error('Error in favorite check endpoint:', error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;