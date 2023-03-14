import { useNavigate } from "react-router-dom";

function Button() {
  
    const navigate = useNavigate();
  
    return ( 
      <button onClick={()=>{ navigate("/start"); }} >
          На стартовую страницу...
      </button>
    );
}

export default Button;