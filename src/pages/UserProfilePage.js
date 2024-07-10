import UserProfile from '../features/user/components/UserProfile';
import NavBar from '../features/navbar/NavBar';

function UserProfilePage() {
    return (
        <div>
            <NavBar>
                <UserProfile></UserProfile>
            </NavBar>
        </div>
    );
}

export default UserProfilePage;
