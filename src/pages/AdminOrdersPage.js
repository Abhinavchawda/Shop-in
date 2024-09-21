import AdminOrders from '../features/admin/components/AdminOrders';
import Footer from '../features/navbar/Footer';
import NavBar from '../features/navbar/NavBar';

function AdminOrdersPage() {
    return (
        <div>
            <NavBar>
                <AdminOrders></AdminOrders>
            </NavBar>
            <Footer></Footer>
        </div>
    );
}

export default AdminOrdersPage;
