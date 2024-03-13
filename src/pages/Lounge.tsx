import { useNavigate } from "react-router";

const Lounge = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div>
      Lounge <button onClick={goBack}>Go Back</button>
    </div>
  );
};

export default Lounge;
