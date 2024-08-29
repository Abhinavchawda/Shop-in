import Trending from '../features/Trending';
import ProductList from '../features/ProductList/components/ProductList';
import Footer from '../features/navbar/Footer';
import NavBar from '../features/navbar/NavBar';

function Home() {
    return (
        <div>
            <NavBar>
                <Trending></Trending>
                <ProductList></ProductList>
            </NavBar>
            <Footer></Footer>
        </div>
    );
}

export default Home;
