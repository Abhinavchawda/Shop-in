import Footer from '../features/navbar/Footer';
import NavBar from '../features/navbar/NavBar';
import About from '../features/navbar/AboutMe';

function AboutUs() {
    return (
        <div className='min-h-screen'>
            <NavBar>
                <About></About>
            </NavBar>
            <Footer></Footer>
        </div>
    );
}

export default AboutUs;
