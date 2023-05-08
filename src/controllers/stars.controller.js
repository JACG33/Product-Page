import { Star } from "../models/Star.model.js";

/*
 * Funcion para agregar a la consulta la cantidad de estrellas que tiene un producto.
 * @params {object} Objeto con la consulta realizada.
 * */
const getStarts = async (params) => {
  await Star.sync();

  const resulStarts = await Star.findAll();
  params.forEach((prod) => {
    let tempStart = 0;
    let countStart = 0;
    resulStarts.forEach((start) => {
      if (prod.dataValues.id_product == start.dataValues.id_product) {
        tempStart += start.dataValues.star_number;
        countStart++;
      }
    });
    let rating = tempStart / countStart;
    prod.dataValues.rating = rating ? Number(rating.toFixed(2)) : 0;
  });
};

export { getStarts };
