import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../authSlice";
import { Navigate } from "react-router-dom";
import { ServerIcon } from "@heroicons/react/20/solid";
import { selectUserInfo } from "../../user/userSlice";

function ProtectedAdmin({children}) {
    const user = useSelector(selectUserInfo)

    if(!user) {
        return <Navigate to='/login' replace={true}></Navigate>
    }
    else if(user && user.role !=='admin')
        return <Navigate to='/' replace={true}></Navigate>
    else
        return children;
}

export default ProtectedAdmin;