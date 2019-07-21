import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import BaseController from '../base-controller';

import UserModel from '../../models/user';

type UserToRegister = {
  email: string;
  name?: string;
  password: string;
};

const createToken = (id: string): Promise<string> =>
  new Promise((resolve, reject) => {
    jwt.sign(
      { id },
      process.env.SECRET as string,
      { issuer: process.env.JWT_ISSUER as string, expiresIn: '1yr' },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });

class UserController extends BaseController {
  constructor() {
    super();
    this.register = this.register.bind(this);
    this.update = this.update.bind(this);
  }

  async register(req: Request, res: Response): Promise<void> {
    const errors = this.getValidationErrors(req);
    if (errors) {
      res.status(422).json({ errors });
      return;
    }

    const { email, name, password }: UserToRegister = req.body;
    let saltRounds: number | undefined;

    if (process.env.SALT_ROUNDS) saltRounds = +process.env.SALT_ROUNDS;

    const salt = await bcrypt.genSalt(saltRounds);

    const hashedPass = await bcrypt.hash(password, salt);

    const user = await new UserModel({
      email,
      password: hashedPass,
      name,
    }).save();

    console.log(`Successfully created new user with email: ${email}`);

    const { id } = user;

    try {
      const token = await createToken(id);
      console.log(`Successfully created JWT for user with id: ${id}`);
      res.status(200).json({ token });
    } catch (err) {
      console.error(`The following error occured when trying to create JWT: ${err}`);
      res.status(500).json({ error: err.message });
    }
  }

  async update(req: Request, res: Response) {
    const errors = this.getValidationErrors(req);
    if (errors) {
      res.status(422).json({ errors });
      return;
    }

    const {
      body: { properties },
      params: { userId },
    } = req;

    const updatedUser = await UserModel.findOneAndUpdate({ _id: userId }, { properties }, { new: true });

    if (!updatedUser) {
      const errorMessage = `No user with id: ${userId}`;
      console.error(errorMessage);
      res.status(500).json({ error: errorMessage });
      return;
    }

    res.status(200).json(updatedUser);
  }
}

export default UserController;
