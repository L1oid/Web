import { useNavigate } from "react-router-dom";

function ButtonNavigate(props) {
  
    const navigate = useNavigate();
  
    return ( 
      <button className={props.class} onClick={()=>{ navigate(props.value); }} >
          {props.name}
      </button>
    );
}

export default ButtonNavigate;