function errorHandling(err, req, res, next) {
  console.log(err);
  console.log(err.name, "name");
  if(err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError" ) {
    let error = err.errors[0].message;
    return res.status(400).json({message : error});
  }

  if(err.name === "UnregisteredEmail" || err.name === "InvalidPassword" || err.name === "Unauthorized") {
    return res.status(401).json({message : err.message});
  }
  if(err.name === "JsonWebTokenError") {
    return res.status(401).json({message : 'Invalid token'});
  }
  if(err.name === "NotEmpty") {
    return res.status(400).json({message : err.message});
  }
  if(err.name === "NotFound") {
    return res.status(404).json({message : err.message});
  }

  res.status(500).json({message : 'Internal server error'});
}

module.exports = errorHandling;
