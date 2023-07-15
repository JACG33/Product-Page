import React from 'react'

export const EditUser = ({form,handleChange,handleOpenModal}) => {
  return (
    <div className="card">
      <div className="card__step">
        <span>Editar Perfil</span>
      </div>
      <div className="card__data">
        <label className="card__label" htmlFor="nombre">
          Nombre de Usuario
        </label>
        <input
          id="nombre"
          className="card__input"
          type="text"
          name="name"
          placeholder="Nombre de Usuario"
          required=""
          pattern="^[A-Za-zÑñ\s]+$"
          value={form.name}
          onChange={handleChange}
        />
        <label className="card__label" htmlFor="descripcion">
          Descripción
        </label>
        <textarea
          id="descripcion"
          className="card__textarea"
          cols="30"
          rows="10"
          name="descrip"
          placeholder="Descripcion"
          required=""
          data-pattern="^.{15,140}$"
          value={form.descrip}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="card__btn flex-jus-btw">
        <button
          className="btn btn__prev"
          type="button"
          data-close="cerrar"
          onClick={handleOpenModal}
        >
          Cerrar
        </button>
        <button
          className="btn btn__send"
          type="submit"
          data-next="añadirSend"
          data-name="undefined"
        >
          Guardar
        </button>
      </div>
    </div>
  );
};

