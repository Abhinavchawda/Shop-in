import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
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