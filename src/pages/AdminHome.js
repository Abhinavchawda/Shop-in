import AdminProductList from '../features/admin/components/AdminProductList';
import Footer from '../features/navbar/Footer';
import NavBar from '../features/navbar/NavBar';

function AdminHome() {
    return (
        <div>
            <NavBar>
                <AdminProductList></AdminProductList>
            </NavBar>
            <Footer></Footer>
        </div>
    );
}

export default AdminHome;
