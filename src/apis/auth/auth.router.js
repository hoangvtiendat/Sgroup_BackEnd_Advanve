import authController from './auth.controller'
import express from 'express'
import verify from  '../../middleware/verify'

const route = express.Router();

route.post('/login', authController.login);
route.post('/register', authController.register);
route.get('/me',verify, authController.getInformation);

export default route;