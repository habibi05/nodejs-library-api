const Joi = require('joi');

const authorSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'Field name is required.',
        'any.required': 'Field name cannot be empty.',
    }),
    bio: Joi.string().required().messages({
        'string.empty': 'Field bio is required.',
        'any.required': 'Field bio cannot be empty.',
    }),
    birth_date: Joi.date().max('now').required().messages({
        'date.base': 'Field birth_date must be a valid date.',
        'date.max': 'Field birth_date cannot be in the future.',
        'any.required': 'Field birth_date is required.',
    })
});

exports.validateAuthor = (req, res, next) => {
    const { error } = authorSchema.validate(req.body);

    if (error) {
        const message = req.params.id ? "Failed update authors" : "Failed create authors"
        return res.status(400).json({ message, error: error.details[0].message });
    }

    next();
};
