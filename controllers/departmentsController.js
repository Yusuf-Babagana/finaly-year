const getAllDepartments = require('../utils/getData').getAllDepartments;
module.exports = async (req, res) => {
  let departments = [];
  try {
    departments = await getAllDepartments();
  } catch (error) {
    res.json({ "status": "failure", message: error.message });
  }
  if (departments.length > 0) {
    res.json(departments);
    // res.render("departments", { departments });
  } else {
    res.redirect('/');
  }
}