const Joi = require('joi');

exports.userSchema = Joi.object({
  name: Joi.any(),
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().required(),
  // password_confirmation: Joi.string().valid(Joi.ref('password')).required()
  //   .messages({
  //     'string.invalid': 'Password confirmation does not match',
  //     'string.empty': 'Password confirmation does not match'
  //   })
  password_confirmation: Joi.string().min(3).max(30).required()
    .messages({
      'string.empty': 'Name is required!',
      'string.min': 'Name must be at least {min} characters long',
      'string.max': 'Name must be less than {max} characters long',
    }),
});

exports.validateRequest = (schema, req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    const messages = error.details.map((detail) => detail.message).join(',');
    return res.status(422).json({ error: messages });
  }
  next();
}