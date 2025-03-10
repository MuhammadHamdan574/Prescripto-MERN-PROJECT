import jwt from "jsonwebtoken";

// Admin authentication middleware
const authAdmin = async (req, res, next) => {
  try {
    debugger
    const { atoken } = req.headers;

    if (!atoken) {
      return res.json({
        success: false,
        messsage: "Not have the atoken",
      });
    }

    // Decode token
    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
    if (token_decode != process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({
        success: false,
        messsage: "Not Authorized Login Again",
      });
    }

    next();
  } catch (error) {
    console.log("Error gives :", error);
    return res.json({
      success: false,
      messsage: error.messsage,
    });
  }
};

export default authAdmin;
