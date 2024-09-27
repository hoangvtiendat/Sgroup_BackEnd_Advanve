import userModel from '../../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class authService {
  constructor() {
    this.userModel = new userModel();
  }

  async login(username, password) {
    try {
      const user = await this.userModel.getUserByUsername(username);
      console.log(user);
      if (!user) {
        throw new Error('User not found');
      }

      // const checkPassword = await this.userModel.getPassword(password);
      // if (!checkPassword) {
      //   throw new Error('Invalid password');

      const isPasswordValid = await bcrypt.compare(password, user[0].password);
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }

      const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      return {token: token};
    } catch (error) {}
  }

  async register(username, password, email, gender, age, role) {
    try {
      const user = await this.userModel.getUserByUsername(username);
      console.log("user: ", user);
      if (user.length !== 0) {
        throw new Error('Username already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        username,
        password: hashedPassword,
        email,
        gender,
        age,
        role,
      };
      console.log("newUser", newUser);
      await this.userModel.createUser(newUser);
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async getInformation(req, res) {
    console.log('req.user.id: ', req.user.id);
    
    try {
      console.log("req.user.id: ", req.user.id);
      const user = await this.userModel.getUserById(req.user.id);
      return user;
      
    } catch (error) {
      throw error;
    }
  }
}

export default new authService();
