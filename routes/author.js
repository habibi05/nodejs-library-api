const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const { validateAuthor } = require('../middlewares/validateAuthor');

router.get('/:id', authorController.getAuthorsDetail);
router.put('/:id', validateAuthor, authorController.updateAuthors);
router.delete('/:id', authorController.deleteAuthors);
router.get('/', authorController.getAuthors);
router.post('/', validateAuthor, authorController.createAuthors);

module.exports = router;
