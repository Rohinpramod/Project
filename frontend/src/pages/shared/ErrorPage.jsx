import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <img
        className="w-[50vh]"
        src="https://th.bing.com/th/id/OIP.yYBFzWZ0R970KK2bJhwO9AHaEi?rs=1&pid=ImgDetMain"
      />
      <button>Navigate to home</button>Navigate to home
      <button className="btn btn-warning ms-3" onClick={() => navigate("/")}>
        Click Here
      </button>
    </div>
  );
};

export default ErrorPage;
