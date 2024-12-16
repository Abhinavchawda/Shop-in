import Trending from '../features/Trending';
import ProductList from '../features/ProductList/components/ProductList';
import Footer from '../features/navbar/Footer';
import NavBar from '../features/navbar/NavBar';

function Home() {
    return (
        <div>
            <NavBar>
                <Trending></Trending>
                {/* <iframe
                    className='flex justify-center items-center mx-auto rounded-2xl my-5'
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/Rvu8XBlz3Sw"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe> */}
                <ProductList></ProductList>
            </NavBar>
            <Footer></Footer>
        </div>
    );
}

export default Home;
