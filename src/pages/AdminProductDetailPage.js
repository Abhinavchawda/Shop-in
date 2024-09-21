import AdminProductList from '../features/admin/components/AdminProductList';
import NavBar from '../features/navbar/NavBar';

function AdminProductListPage() {
    return (
        <div>
            <NavBar>
                <AdminProductList></AdminProductList>
            </NavBar>
        </div>
    );
}

export default AdminProductListPage;