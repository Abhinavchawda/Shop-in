import Footer from '../features/navbar/Footer';
import NavBar from '../features/navbar/NavBar';
import Contact from '../features/navbar/Contact';

function ContactUs() {
    return (
        <div className='min-h-screen'>
            <NavBar>
                <Contact></Contact>
            </NavBar>
            <Footer></Footer>
        </div>
    );
}

export default ContactUs;
