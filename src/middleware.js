import RolesModel from './roles/model.js';

const rolesModel = new RolesModel();

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

function grantAccess(role) {
  return async (req, res, next) => {
    const rolesValue = {
      user: 1,
      manager: 2,
      admin: 3,
    };

    try {
      const { roleId } = res.locals.user;
      const { title: userRole } = await rolesModel.getById(roleId);

      if (!rolesValue[role]) throw Error(`${role} doesn't exists`);
      if (!rolesValue[userRole]) throw Error(`${userRole} doesn't exists`);

      if (rolesValue[userRole] < rolesValue[role]) {
        throw Error(
          `You need at least ${role} role to access that route. Role given: ${userRole}`
        );
      }

      next();
    } catch (error) {
      res.status(401).json({
        error: error.message,
      });
    }
  };
}

export { validateRequest, grantAccess };
