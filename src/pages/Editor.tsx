import { useNavigate } from "react-router";

const Editor = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div>
      Editor <button onClick={goBack}>Go Back</button>
    </div>
  );
};

export default Editor;
