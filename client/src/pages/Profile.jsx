import { Navigate } from "react-router-dom";
import { useAppProvider } from "../components/context/AppProvider";
import { useEffect, useState } from "react";
import { API_URL } from "../config/appConstans";
import { UserProduct } from "../components/user/UserProduct";
import { ModalForm } from "../components/modals/ModalForm";
import { Loader } from "../components/Loader";
import ProfileInfo from "../components/user/ProfileInfo";

let prod = [];
const Profile = () => {
  const { stateUser, logut } = useAppProvider();
  const [userProducts, setUserProducts] = useState(prod);
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState();
  const [otherData, setOtherData] = useState();

  const getUserProducts = async () => {
    try {
      let solic = await fetch(`${API_URL}userProduct`);
      let json = await solic.json();
      if (json.message == "Unauthorized") {
        return logut();
      }
      setUserProducts(json);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      let solic = await fetch(`${API_URL}products/${id}`, {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
      });

      let json=await solic.json()
      if(json.message=="Datos elimiados")getUserProducts();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserProducts();
  }, []);

  if (!stateUser) return <Navigate to="/login" />;

  const handleOpenModal = (type, ...params) => {
    if (!openModal) {
      setOpenModal(true);
      setModalType(type);
      setOtherData(params[0]);
    } else setOpenModal(false);
  };
  return (
    <>
      <ModalForm
        openModal={openModal}
        handleOpenModal={handleOpenModal}
        getUserProducts={getUserProducts}
        typeModal={modalType}
        otherData={otherData}
      />
      <section className="container profile">
        <ProfileInfo handleOpenModal={handleOpenModal} />
        <div className="products products__user" id="productList">
          {userProducts.length == 0 && <Loader />}
          {userProducts.length > 0 &&
            userProducts.map((ele, index) => (
              <UserProduct
                key={index}
                name={ele.name}
                descrip={ele.descrip}
                descripCut={ele.descripCut}
                rating={ele.rating}
                id_product={ele["id_product"]}
                index={index}
                handleOpenModal={handleOpenModal}
                handleDelete={handleDelete}
              />
            ))}
        </div>
      </section>
    </>
  );
};

export default Profile;
