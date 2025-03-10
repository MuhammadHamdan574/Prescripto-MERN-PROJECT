import jwt from "jsonwebtoken";

// User authentication middleware
const authDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;

    if (!dtoken) {
      return res.json({
        success: false,
        messsage: "Not Authorized Login Again",
      });
    }

    // Decode token
    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);
    req.body.docId = token_decode.id;

    next();
  } catch (error) {
    console.log("Error gives :", error);
    return res.json({
      success: false,
      messsage: "Error occured in User Auth",
    });
  }
};

export default authDoctor;
