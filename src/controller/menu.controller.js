export const CreateMenu = async (request, response) => {
  try {

    const {name,description,price,category,isAvailable} = request.body || {
        name:"",
        description:"",
        price:0,
        category:"",
        isAvailable:false
    }

        





  } catch (error) {
    console.log(error.message);

    response.status(500).json({
      success: false,
      message: "Error at Server",
    });
  }
};
