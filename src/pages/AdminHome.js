import AdminProductList from '../features/ProductList copy/components/AdminProductList';
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
