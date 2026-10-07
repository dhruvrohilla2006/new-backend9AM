import { success } from "zod";

const validate = (schema) => {
  return async (request, resposnse, next) => {
    try {
      console.log(request.body);

      const body = request.body;

      let result = schema.safeParse(body);
      console.log(result);

      if (!result) {
        return resposnse.status(400).json({
          success: false,
          message: "Wrong Data Sent",
        });
      }

      
      next()
    } catch (error) {
      console.log(error.message);
      return resposnse.status(500).json({
        success: false,
        resposnse: "Some Error at Server",
      });
    }
  };
};
