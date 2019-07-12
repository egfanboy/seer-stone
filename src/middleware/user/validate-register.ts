import { check, sanitize } from 'express-validator';

export default [
  sanitize('email').normalizeEmail({
    all_lowercase: true,
    gmail_convert_googlemaildotcom: false,
    gmail_remove_dots: false,
  }),
  sanitize('name'),
  check('email').isEmail(),
  check('name')
    .not()
    .isEmpty(),
  check('password', 'You must provide a password')
    .not()
    .isEmpty(),
];
