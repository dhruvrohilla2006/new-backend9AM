const roleMiddleware = (...roles) => {
  return (request, response, next) => {
    if (!roles.includes(request.token.role)) {
      return response.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    next();
  };
};

export default roleMiddleware