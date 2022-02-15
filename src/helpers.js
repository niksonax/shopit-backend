import jwt from 'jsonwebtoken';

function jwtTokens({ id, name, email, roleId }) {
  const user = { id, name, email, roleId };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '1d',
  });

  return { accessToken, refreshToken };
}

function snakeToCamelKeys(obj) {
  const snakeToCamel = (str) =>
    str
      .toLowerCase()
      .replace(/([-_][a-z])/g, (group) =>
        group.toUpperCase().replace('-', '').replace('_', '')
      );

  const data = Object.entries(obj).reduce(
    (x, [k, v]) => (x[snakeToCamel(k)] = v) && x,
    {}
  );

  return data;
}

export { jwtTokens, snakeToCamelKeys };
