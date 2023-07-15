export const verifySearch = async (req, res, next) => {
  const { producto } = req.params;

  console.log(req.params.producto);

  if (req.params.producto == undefined) return res.redirect("/products");
  next();
};
