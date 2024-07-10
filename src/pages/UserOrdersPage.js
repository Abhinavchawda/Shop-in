import UserOrders from '../features/user/components/UserOrders';
import NavBar from '../features/navbar/NavBar';

function UserOrdersPage() {
    return (
        <div>
            <NavBar>
                <UserOrders></UserOrders>
            </NavBar>
        </div>
    );
}

export default UserOrdersPage;
