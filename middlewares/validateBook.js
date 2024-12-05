const Joi = require('joi');
const { Author } = require('../models');

const BookSchema = Joi.object({
    title: Joi.string().required().messages({
        'string.empty': 'Field title is required.',
        'any.required': 'Field title cannot be empty.',
    }),
    description: Joi.string().required().messages({
        'string.empty': 'Field description is required.',
        'any.required': 'Field description cannot be empty.',
    }),
    publish_date: Joi.date().max('now').required().messages({
        'date.base': 'Field publish_date must be a valid date.',
        'date.max': 'Field publish_date cannot be in the future.',
        'any.required': 'Field publish_date is required.',
    }),
    author_id: Joi.number().integer().required().messages({
        'number.base': 'Field author_id must be a number.',
        'number.integer': 'Field author_id must be an integer.',
        'any.required': 'Field author_id cannot be empty.',
    }),
});

exports.validateBook = async (req, res, next) => {
    const { error } = BookSchema.validate(req.body);

    if (error) {
        const message = req.params.id ? "Failed update book" : "Failed create book"
        return res.status(400).json({ message, error: error.details[0].message });
    }

    const { author_id } = req.body;
    const authorExists = await Author.findByPk(author_id);
    if (!authorExists) {
        return res.status(400).json({ error: 'Invalid author_id, author does not exist.' });
    }

    next();
};
