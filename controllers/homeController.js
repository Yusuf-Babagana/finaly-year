const getAllDepartments = require("../utils/getData").getAllDepartments;

getHomePage = async (req, res) => {
    let departments = []
  try {
    departments = await getAllDepartments();
    res.render('home', {departments: departments});
  } catch (error) {
    console.log(error);
  }
};

module.exports = getHomePage;
