import { Link, useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <section>
      <h1>Admin Page</h1>
      <p>You must have been assigned an admin role.</p>
      <h2>Here is the list of current Users</h2>
      <button onClick={goBack}>Go Back</button>
    </section>
  );
};

export default Admin;
