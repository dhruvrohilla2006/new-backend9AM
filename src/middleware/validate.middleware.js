import { success } from "zod";

const validate = (schema) => {
  return async (request, resposnse, next) => {
    try {
      console.log(request.body);

      const body = request.body;

      let result = schema.safeParse(body);
      console.log(result);

      if (!result.success) {
        const errors = {};

        result.error.issues.forEach((item) => {
          errors[item.path.join(".")] = item.message;
        });

        console.log(errors);
        return resposnse.status(400).json({
          success: false,
          message: "Wrong Data Sent",
          errors,
        });
      }

      next();
    } catch (error) {
      console.log(error.message);
      return resposnse.status(500).json({
        success: false,
        resposnse: "Some Error at Server",
      });
    }
  };
};

export default validate;
