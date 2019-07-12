import { UserI } from '../models/user';

const serializeUser = ({ id, email, name, properties }: UserI) => ({ id, email, name, properties });

export default serializeUser;
