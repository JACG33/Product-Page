export const ProductItem = ({ name, descrip, rating }) => {
  return (
    <div className="product__item">
      <div className="product__info">
        <span className="product__name">{name}</span>
        <p className="product__descrip">{descrip}</p>
      </div>
      {rating >= 0 && (
        <div
          className="stars"
          id="starsContainer{{{@index}}}"
          data-post="{{{dataValues.id_product}}}"
          data-starsstatus="false"
        >
          <button type="button" className="star__btn">
            <img
              src="img/svgIcons/starNone.svg"
              data-star="star"
              data-starcount="1"
              data-starstatus="false"
              alt=""
            />
          </button>
          <button type="button" className="star__btn">
            <img
              src="img/svgIcons/starNone.svg"
              data-star="star"
              data-starcount="2"
              data-starstatus="false"
              alt=""
            />
          </button>
          <button type="button" className="star__btn">
            <img
              src="img/svgIcons/starNone.svg"
              data-star="star"
              data-starcount="3"
              data-starstatus="false"
              alt=""
            />
          </button>
          <button type="button" className="star__btn">
            <img
              src="img/svgIcons/starNone.svg"
              data-star="star"
              data-starcount="4"
              data-starstatus="false"
              alt=""
            />
          </button>
          <button type="button" className="star__btn">
            <img
              src="img/svgIcons/starNone.svg"
              data-star="star"
              data-starcount="5"
              data-starstatus="false"
              alt=""
            />
          </button>
        </div>
      )}
      <div className="rating__result">
        <span>Puntuacion del Producto {rating}/5</span>
      </div>
    </div>
  );
};
