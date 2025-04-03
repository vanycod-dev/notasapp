const express = require('express');
const { createNote, getNotes } = require('../controllers/noteController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createNote);
router.get('/', authMiddleware, getNotes);

module.exports = router;
