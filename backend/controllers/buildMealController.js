// controllers/buildMealController.js
export const getBuildMealPage = (req, res) => {
    res.status(200).json({
      message: "Welcome to Build My Meal page! Customize your perfect meal here.",
    });
  };
  