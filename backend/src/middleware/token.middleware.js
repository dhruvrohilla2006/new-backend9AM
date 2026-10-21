import { verifyToken } from "../libs/jwt.js";

export const tokenValidate = async (request, response, next) => {
  try {
    const token = request?.cookies.jwt;
    console.log(typeof token);

    if (token == undefined) {
      return response.status(401).json({
        success: false,
        message: "You are not Authriese to make request",
      });
    }

    console.log(token);

    const decode = verifyToken(token);

    console.log(decode);
    request.token = decode;

    next();
  } catch (error) {
    console.log("Found Error", error.message);

    response.status(500).json({
      success: false,
      message: "Error at Server",
    });
  }
};
