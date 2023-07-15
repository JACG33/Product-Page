import { useEffect, useState } from "react";
import { ProductItem } from "../components/products/ProductItem";
import { Navigate } from "react-router-dom";
import { useAppProvider } from "../components/context/AppProvider";
import { API_URL } from "../config/appConstans";
import { Loader } from "../components/Loader";

let products = [];
const Products = () => {
  const [prod, setProd] = useState(products);

  const { stateUser, logut } = useAppProvider();

  const getProducts = async () => {
    try {
      let soli = await fetch(`${API_URL}products`);

      let json = await soli.json();

      if (json.message == "Unauthorized") {
        return logut();
      }
      setProd(json);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (!stateUser) return <Navigate to={"/login"} />;
  return (
    <section className="container products" id="sectionUser">
      {prod.length == 0 && <Loader />}
      {prod.length > 0 &&
        prod.map((ele, index) => (
          <ProductItem
            key={index}
            name={ele.name}
            descrip={ele.descrip}
            rating={ele.rating}
          />
        ))}
    </section>
  );
};

export default Products;
