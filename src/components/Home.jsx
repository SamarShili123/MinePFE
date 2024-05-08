import React , {useRef} from 'react'
import { Link } from 'react-router-dom'
import c from "../assets/undraw_contact_us_re_4qqt.svg"
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function Home() {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_d040yym', 'template_srj27pr', form.current, {
        publicKey: 'Rj9g88N2nE6dJHjZB',
      })
      .then(
        () => {
          toast.success('Successfully Sent ✅', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: "Bounce",
            });
          form.current.reset()
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };
  return (
    <div className='Home'>
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={"Bounce"}
      />
      {/* Same as */}
      <ToastContainer />
      <div className='Hero'>
        <div className='NavBar'>
          <p>Logo.</p>
          <div className="innerNavBarMenu">
            <Link to={"/register"}>Register</Link>
            <Link to={"/login"}>Login</Link>
            <a href='#AboutUs'>About Us</a>
            <a href='#ContactUs'>Contact Us</a>
            <select name="cars" id="cars">
              <option value="Fr" >Fr</option>
              <option value="En" selected>En</option>
              <option value="Ar">Ar</option>
            </select>
          </div>
        </div>
        <div className='CTAHolder'>
          <h1>Take Your Business To a New Level</h1>
          <Link to={"/register"}>Get Your Free Trail</Link>
        </div>
      </div>
      
      <div className='AboutUs' id='AboutUs'>
        <div className='innerAboutUsTextHolder' >
          <span id='s1'></span>
          <span id='s2'></span>
          <h1>About Us</h1>
          <p>Les progrès technologiques transforment rapidement le paysage agricole, et les applications mobiles sont devenues des outils indispensables pour les agriculteurs du monde entier. Ces applications offrent une multitude de fonctionnalités, de la gestion des cultures à la surveillance en temps réel des conditions météorologiques.</p>
        </div>
      </div>

      <div className='ContactUs' id='ContactUs'>
        <form className="inputsHolderInsideContact" ref={form} onSubmit={sendEmail}>
          <h1>Contact Us</h1>
          <div>
            <label>Username</label>
            <input placeholder='type username' required name='name'></input>
          </div>
          <div>
            <label>Email</label>
            <input placeholder='type email' required name='email' ></input>
          </div>
          <div>
            <label>Message</label>
            <textarea placeholder='type message' name='message'></textarea>
          </div>
          <button type='submit'>Submit</button>
        </form>
        <img src={c} alt='contactus'></img>
      </div>

      <footer className='footerInHome'>
        Made With 💚 By Samar
      </footer>
    </div>
  )
}

export default Home