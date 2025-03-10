import jwt from "jsonwebtoken";

// User authentication middleware
const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({
        success: false,
        messsage: "Not Authorized Login Again",
      });
    }

    // Decode token
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;

    next();
  } catch (error) {
    console.log("Error gives :", error);
    return res.json({
      success: false,
      messsage: "Error occured in User Auth",
    });
  }
};

export default authUser;
