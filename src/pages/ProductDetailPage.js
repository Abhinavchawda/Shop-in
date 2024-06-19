import ProductDetail from '../features/ProductList/components/ProductDetail';
import NavBar from '../features/navbar/NavBar';

function ProductListPage() {
    return (
        <div>
            <NavBar>
                <ProductDetail></ProductDetail>
            </NavBar>
        </div>
    );
}

export default ProductListPage;
