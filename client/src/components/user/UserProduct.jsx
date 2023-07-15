export const UserProduct = ({
  name,
  descrip,
  rating,
  descripCut,
  id_product,
  handleOpenModal,
  handleDelete
}) => {
  let dataToEdit = {
    id:id_product,
    name,
    descrip
  }
  
  return (
    <div className="product__item">
      <div className="product__info">
        <span className="product__name">{name}</span>
        <p className="product__descrip">{descripCut}</p>
      </div>
      <div className="product__actions">
        <button
          className="btn btn-edit"
          type="button"
          onClick={()=>handleOpenModal("editProduct",dataToEdit)}
        >
          Editar
        </button>
        <button
          className="btn btn-delet"
          type="button"
          onClick={()=>handleDelete(id_product)}
        >
          Eliminar
        </button>
      </div>

      <div className="rating__result">
        <span>Puntuacion del Producto {rating}/5</span>
      </div>
    </div>
  );
};
