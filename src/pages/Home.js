import ProductList from '../features/ProductList/components/ProductList';
import NavBar from '../features/navbar/NavBar';

function Home() {
    return (
        <div>
            <NavBar>
                <ProductList></ProductList>
            </NavBar>
        </div>
    );
}

export default Home;
