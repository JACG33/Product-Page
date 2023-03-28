export const verifyLogedUser = async (req, res, next) => {
  if (req.session.user) res.locals.userLogged = true;
  else res.locals.userLogged = false;
  next();
};
