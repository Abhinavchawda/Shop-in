import ProductList from '../features/ProductList/components/ProductList';
import Footer from '../features/navbar/Footer';
import NavBar from '../features/navbar/NavBar';

function Home() {
    return (
        <div>
            <NavBar>
                <ProductList></ProductList>
            </NavBar>
            <Footer></Footer>
        </div>
    );
}

export default Home;
