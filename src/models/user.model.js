import poll from '../database/connection';

class userModel {
  async getUserByUsername(username) {
    try {
      const connection = await poll;
      const [rows, fields] = await connection.query(
        'SELECT * FROM `user` WHERE username = ?',
        [username]
      );

      return rows;
    } catch (error) {
      return error;
    }
  }

  async createUser(user) {
    try {
      const connection = await poll;
      const query =
        'INSERT INTO user(username, email, password, gender, age, role) value (?,?,?,?,?,?); ';
        const value  = [
          user.username,
          user.email,
          user.password,
          user.gender,
          user.age,
          user.role,
        ]
        
        console.log("data user: ", user);
        await connection.query(query, value);
    } catch (error) {}
  }

  async getUserById(id) {
    try {
      const connection = await poll;
      const [rows, fields] = await connection.query(
        'SELECT * FROM `user` WHERE id =?',
        [id]
      );

      return rows;
    } catch (error) {
      return error;
    }
  }
}

export default userModel;
