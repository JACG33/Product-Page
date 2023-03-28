export const verifyToekn = async (req, res, next) => {
  if (!req.session.token || req.session.token == undefined) {
    console.log("no existe la session");
    return res.redirect("/login");
  }
  next();
};
