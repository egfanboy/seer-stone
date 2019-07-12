import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';

import baseRouter from './routes/base-router';

import './middleware/authentication';

const app = express();

app.use(bodyParser.json());

// // Passport JS is what we use to handle our logins
app.use(passport.initialize());
app.use(passport.session());

app.use(baseRouter);

export default app;
