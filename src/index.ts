import app from './server';
import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const { DB_BASE_URI, DB_NAME } = process.env;

if (!DB_BASE_URI || !DB_NAME) {
  console.error('You must provide both `DB_BASE_URI` and `DB_NAME` in your .env file');
  process.exit(1);
}

const port = process.env.PORT || 8081;

const mongoURI = `${DB_BASE_URI}/${DB_NAME}`;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
  console.log(`Attempting to connect to mongoDB with URI: ${mongoURI}`);

  mongoose
    .connect(mongoURI, { useNewUrlParser: true, useFindAndModify: false })
    .then(() => console.log('Successfully connected to mongoDB'))
    .catch(err => console.error('The following error occured when trying to connect to mongoDB', err));
});

process.on('unhandledRejection', error => {
  console.error(`Unhandled Promise Occured`, error);
});
