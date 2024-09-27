import authService from './auth.service';

class authController {
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const token = await authService.login(username, password);

      return res.status(200).json({
        success: true,
        data: token,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  async register(req, res) {
    try {
      const { username, password, email, gender, age, role } = req.body;
      const user = await authService.register(
        username,
        password,
        email,
        gender,
        age,
        role
      );

      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    }
  }

  async getInformation(req, res){
	try {
		const user = await authService.getInformation(req, res);
        return res.status(200).json({
            success: true,
            data: user
        })
	} catch (error) {
		return res.status(500).json({
            success: false,
            error: error.message
        })
	}
  }
}

export default new authController();
