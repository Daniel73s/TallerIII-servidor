const express = require('express');
const router = express.Router();
const { addrating, listaPuntuacionesVet, ratingExist, listarRatingById, modRating} = require('../controllers/rating.controller');
router.post('/ratingexist',ratingExist);
router.post('/addrating',addrating);
router.get('/listarRating/:codvet',listaPuntuacionesVet);
router.post('/listaratingbyid',listarRatingById);
router.put('/modrating',modRating);
module.exports = router;