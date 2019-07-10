const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Post = require('../../models/Annonce');
// Profile model
const Profile = require('../../models/Profile');

// Validation
const validateAnnoucementInput = require('../../validation/annonce');

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Annoucement Works' }));

// @route   GET api/annoucement
// @desc    Get posts
// @access  Public
router.get('/', (req, res) => {
  Annonce.find()
    .sort({ date: -1 })
    .then(annonces => res.json(annonces))
    .catch(err => res.status(404).json({ nopostsfound: 'No Annoucement found' }));
});

// @route   GET api/annoucement/:id
// @desc    Get annoucement by id
// @access  Public
router.get('/:id', (req, res) => {
  Annonce.findById(req.params.id)
    .then(annonce => res.json(annonce))
    .catch(err =>
      res.status(404).json({ nopostfound: 'No Annoucement found with that ID' })
    );
});

// @route   POST api/annoucement
// @desc    Create annoucement
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateAnnoucementInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newAnnonce = new Annonce({
      avatar: req.body.avatar,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      condition: req.body.condition,
      etat: req.body.etat,
      user: req.user.id
    });

    newAnnonce.save().then(annonce => res.json(annonce));
  }
);

// @route   DELETE  api/annoucement/:id
// @desc    Delete annoucement
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Annonce.findOneAndRemove({_id:req.params.id})
        .then(annonce => {
          // Check for annoucement owner
          if (annonce.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
          }

          // Delete
          annonce.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ annoncenotfound: 'No annoucement found' }));
    });
  }
);



module.exports = router;
