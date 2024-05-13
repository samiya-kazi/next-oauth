import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createNewUser, findUserByEmail } from "../models/user/user.query";
import { createUserLogin, findUserLoginByUserID } from "../models/user-login/user-login.query";
import config from "../config";

export async function login (req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user)
      return res.status(404).json({ error: 'There is no account with this email.' });

    const login = await findUserLoginByUserID(user.id);

    if (!login)
      return res.status(404).json({ error: 'There is no login with this email.' });

    if (!login.password) 
      return res.status(400).json({ error: 'This is not a basic login.' });

    if (bcrypt.compareSync(password, login.password)) {
      const token = jwt.sign({ id: user.id }, config.JWT_SECRET);
      res.setHeader('Authorization', 'Bearer ' + token);
      return res.json({ user });
    } else {
      return res.status(401).json({ error: 'Password does not match.' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: (error as Error).message });
  }
}

export async function register (req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const existingUser = await findUserByEmail(email);
    if (existingUser)
      return res.status(400).json({ error: 'An account with this email already exists.' });

    const salt = bcrypt.genSaltSync();
    const hashedPass = bcrypt.hashSync(password, salt);

    const newUser = await createNewUser({ name, email });
    const newLogin = await createUserLogin(
      { 
        user_id: newUser.id, 
        type: 'basic', 
        email, 
        password: hashedPass
      }
    );

    return res.status(201).json({ user: newUser })
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: (error as Error).message });
  }
}