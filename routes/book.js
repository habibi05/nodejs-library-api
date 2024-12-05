const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { validateBook } = require('../middlewares/validateBook');

router.get('/search', bookController.search);
router.get('/:id', bookController.getBooksDetail);
router.put('/:id', validateBook, bookController.updateBooks);
router.delete('/:id', bookController.deleteBooks);
router.get('/', bookController.getBooks);
router.post('/', validateBook, bookController.createBooks);

module.exports = router;
