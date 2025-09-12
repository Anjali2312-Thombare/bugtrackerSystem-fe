import { useNavigate } from "react-router-dom";
import Button from "../components/Button";


export function LandingPage(){
    const navigate=useNavigate();
     const handleClick = () => {
    console.log('Doing something before navigation...');
    navigate('/Signin');
  };
    return<>
    <div> Landing page </div>
    <Button variant= "signin"title="Signin" onclick={handleClick} ></Button>
    </>
}