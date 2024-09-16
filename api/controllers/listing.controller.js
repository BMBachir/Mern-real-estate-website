export const createListing = async (req, res, next) => {
  try {
    res.send("Tested succesfully..");
  } catch (error) {
    next(error);
  }
};
