import AdminProductForm from '../features/admin/components/AdminProductForm';
import NavBar from '../features/navbar/NavBar';

function AdminProductFormPage() {
    return (
        <div>
            <NavBar>
                <AdminProductForm></AdminProductForm>
            </NavBar>
        </div>
    );
}

export default AdminProductFormPage;