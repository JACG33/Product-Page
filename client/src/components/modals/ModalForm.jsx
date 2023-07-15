import { useEffect, useRef, useState } from "react";
import { API_URL } from "../../config/appConstans";
import { AddProduct } from "./types/AddProduct";
import { EditUser } from "./types/EditUser";
import { useAppProvider } from "../context/AppProvider";
import { EditProduct } from "./types/EditProduct";

let modalForm = {
  id: "",
  name: "",
  descrip: "",
};

let apiRoute = {
  addProduct: (form) =>
    fetch(`${API_URL}products/`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(form),
    }),
  editProduct: (form) =>
    fetch(`${API_URL}products/`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(form),
    }),
  editUser: (form) =>
    fetch(`${API_URL}users/`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(form),
    }),
};

export const ModalForm = ({
  openModal,
  handleOpenModal,
  getUserProducts,
  typeModal,
  otherData,
}) => {
  const refModal = useRef("modalDialog");

  const { userInfo } = useAppProvider();

  const [form, setForm] = useState(modalForm);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let soli = await apiRoute[typeModal](form);

      if (!soli.ok) throw new Error("Error en la solicitud");

      let json = await soli.json();

      if (
        json.message == "Producto añadido" ||
        json.message == "Datos actualizados"
      ) {
        handleOpenModal();
        getUserProducts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (openModal) refModal.current.showModal();
    else refModal.current.close();

    if (typeModal === "editUser")
      setForm({
        ...form,
        name: userInfo.fullname,
      });
    if (typeModal === "addProduct") setForm(modalForm);
    if (typeModal === "deleteProduct") setForm({...modalForm,id:otherData.id});
    if (typeModal === "editProduct")
      setForm({
        id: otherData.id,
        name: otherData.name,
        descrip: otherData.descrip,
      });
  }, [openModal]);
  return (
    <dialog ref={refModal} className="floatModal">
      <form id="form" onSubmit={handleSubmit}>
        {typeModal == "addProduct" && (
          <AddProduct
            form={form}
            handleChange={handleChange}
            handleOpenModal={handleOpenModal}
          />
        )}
        {typeModal == "editProduct" && (
          <EditProduct
            form={form}
            handleChange={handleChange}
            handleOpenModal={handleOpenModal}
            otherData={otherData}
          />
        )}
        {typeModal == "editUser" && (
          <EditUser
            form={form}
            handleChange={handleChange}
            handleOpenModal={handleOpenModal}
          />
        )}
      </form>
    </dialog>
  );
};
