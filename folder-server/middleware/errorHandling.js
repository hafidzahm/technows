function errorHandling(err, req, res, next) {
  console.log(err);
  console.log(err.name, "name");
  if(err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
    let error = err.errors[0].message;
    res.status(400).json({message : error});
  }
}

module.exports = errorHandling;
