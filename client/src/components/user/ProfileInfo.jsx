import { useAppProvider } from "../context/AppProvider";

const ProfileInfo = ({ handleOpenModal }) => {
  const { userInfo } = useAppProvider();
  return (
    <div className="profile__cont">
      <div className="edit__profile__cont">
        <button
          type="button"
          className="btn btn-edit"
          onClick={() => handleOpenModal("editUser")}
        >
          <i className="fa-solid fa-pencil"></i>
        </button>
      </div>
      <div className="profile__cont__img">
        <img
          src="/img/jacg.png"
          className="profile__img"
          alt={userInfo.fullname}
          width="100"
          height="100"
        />
        <span className="profile__name">{userInfo.fullname}</span>
      </div>
      <div className="profile__cont__descrip">
        <p className="profile__descrip">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio
          facilis minima natus, necessitatibus quae.
        </p>
      </div>
      <button
        type="button"
        className="btn btn__send"
        onClick={() => handleOpenModal("addProduct")}
      >
        Añadir producto
      </button>
    </div>
  );
};

export default ProfileInfo;
