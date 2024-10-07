import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AuthorizeRoute(props){
  const {user}=useSelector(state=>state.user)
  if(!user){
    return <p>Loading...!</p>
  }
  if(props.permittedRoles.includes(user.role)){
    return props.children
  }else{
    return <Navigate to='/forbidden'/>
  }
}