function validateRequest(req, res, next, schema) {
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  const { error, value } = schema.validate(req.body, options);

  if (error) {
    return res.status(401).json({
      error: `Validation error: ${error.details
        .map((x) => x.message)
        .join(', ')}`,
    });
  }

  req.body = value;
  next();
}

export { validateRequest };
