import mongoose, { Schema, PassportLocalSchema } from 'mongoose';

import validator from 'validator';
import passportLocalMongoose from 'passport-local-mongoose';

export interface UserI extends mongoose.Document {
  id: string;
  email: string;
  name?: string;
  password: string;
  resetPasswordToken: string;
  resetPasswordExpires: string;
  properties: Map<string, any>;
}

const { REQUIRE_NAME } = process.env;

const userSchema: Schema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please Supply an email address',
  },
  name: {
    type: String,
    trim: true,
    ...(REQUIRE_NAME ? { required: 'Please supply a name' } : {}),
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  password: String,
  properties: { type: Map, of: mongoose.Schema.Types.Mixed },
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

export default mongoose.model<UserI>('User', userSchema);
