
class UserController {
  async signUp(req, res) {
    try {
    } catch (error) {
      console.log("🚀 ~ signUp ~ error:", error)
      return res.handler.internalServerError("Internal Server error!")
    }
  }

  async login(req, res) {
    try {

    } catch (error) {

    }
  }

  async getProfile(req, res) {
    try {

    } catch (error) {

    }
  }
}

module.exports = new UserController();