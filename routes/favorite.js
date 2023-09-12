const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Favorite = require('../models/Favorite');
const { body, validationResult } = require('express-validator');

// ... Existing routes and code ...

// Route to get all favorite leave requests for a user
router.get('/favorite/:userId', async (req, res) => {
    try {
        const favorite = await Favorite.find({ favorite: req.params.userId });
        res.json(favorite);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/addfavorite/:characterId', fetchuser, async (req, res) => {
    try {
        const characterId = req.params.characterId;

        // Assuming you have a Character model for characters
        const character = await Character.findById(characterId);
        if (!character) {
            return res.status(404).json({ message: 'No Favourite found ' });
        }

        if (!character.favorites.includes(req.user.id)) {
            character.favorites.push(req.user.id);
            await character.save();
        }

        res.json({ message: 'Character added to favorites' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Route to remove a leave request from favorite
router.delete('/removefavorite/:id', fetchuser, async (req, res) => {
    try {
        const favorite = await Favorite.findById(req.params.id);
        if (!favorite) {
            return res.status(404).json({ message: 'favorite request not found' });
        }

        if (favorite.favorite.includes(req.user.id)) {
            favorite.favorite = favorite.favorite.filter(userId => userId !== req.user.id);
            await favorite.save();
        }

        res.json({ message: 'favourite request removed from favorite' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
