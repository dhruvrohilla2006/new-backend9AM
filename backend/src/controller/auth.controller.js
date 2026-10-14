import { comparePass, hashPassword, validateEmail } from "../libs/authCheck.js";
import User from "../model/user.model.js";

export const homeFunction = async (request, response) => {
  response.json({
    success: true,
    message: "You are In Auth Routes",
  });
};

export const createUser = async (request, response) => {
  try {
    const { name, password, email } = request.body;

    if (name == undefined || name.length == 0) {
      return response.status(400).json({
        success: false,
        message: "Name field is Required",
      });
    }
    if (email == undefined || email.length == 0) {
      return response.status(400).json({
        success: false,
        message: "email field is Required",
      });
    }
    if (!validateEmail(email)) {
      return response.status(400).json({
        success: false,
        message: "email is Not Valid",
      });
    }

    if (password == undefined || password.length == 0) {
      return response.status(400).json({
        success: false,
        message: "Password field is Required",
      });
    }

    if (password.length < 6 || password.length > 20) {
      return response.status(400).json({
        success: false,
        message: "Password min lenght is 6 and Max is 20",
      });
    }

    const exsistingUser = await User.findOne({email});

    if(exsistingUser){
      return response.status(409).json({
        success:false,
        message:"User Already Exists"
      })
    }

    const hashPass = await hashPassword(password);

    const newUser = await User({
      name,
      email,
      password: hashPass,
    });

    const record = await newUser.save({
      isNew: true,
    });
    console.log(record);
    console.log(newUser);

    response.status(201).json({
      success: true,
      message: "User Created SUccessfully",
      result: record,
    });
  } catch (error) {
    console.log(error.message);
    response.json({
      success: true,
      message: "Error at Server",
    });
  }
};

export const getAllUser = async (request, response) => {
  const result = await User.find({});

  console.log(result);

  response.json({
    success: true,
    message: "User Record Fetched Successfully",
    userRecord: result,
  });
};

export const loginController = async (request, response) => {
  try {
    const { email, password } = request.body || {
      email: "",
      password: "",
    };

    const user = await User.findOne({ email });

    // console.log(user);

    if (!comparePass(password, user.password)) {
      return response.status(401).json({
        success: true,
        message: "Invalid Credentials",
      });
    }

    return response.status(200).json({
      success: true,
      message: "You are logged in Sucessfulyy",
    });
  } catch (error) {
    console.log(error.message);
    response.json({
      success: false,
      message: "Error at Server",
    });
  }
};
