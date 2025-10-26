import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

const Profile = () => {
  const { logout, getProfile } = useContext(UserContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile();
      if (data) setProfile(data);
    };
    fetchProfile();
  }, [getProfile]);

  return (
    <div className="container text-center" style={{ marginTop: "50px" }}>
      <h2>👤 Perfil del Usuario</h2>

      {profile ? (
        <>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>ID:</strong> {profile.id}</p>
        </>
      ) : (
        <p>Cargando información del perfil...</p>
      )}

      {/* Botón para cerrar sesión */}
      <button
        onClick={logout}
        className="btn btn-danger mt-3"
      >
        🔒 Cerrar sesión
      </button>
    </div>
  );
};

export default Profile;
