import React , {useState , useEffect } from 'react'
import { useAuth  } from '../contexts/authContext'
import {  doEmailChange } from '../firebase/auth'
import { Link, useNavigate } from 'react-router-dom';
import { doc , getDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Profile() {
    const {currentUser} = useAuth()
    const [userData, setUserData] = useState({});
    const navigate = useNavigate()
    const [emailDisable, setemailDisable] = useState(true)
    useEffect(() => {
        const fetchUserData = async () => {
        if(currentUser){
            const userDocRef = doc(firestore, "users", currentUser?.uid);
            const docSnap = await getDoc(userDocRef);
            if (docSnap.exists()) {
            setUserData(docSnap.data()); // Set user data state if document exists
            } else {
            console.log("No such document!");
            }
        }
        }
        fetchUserData()
    }, [])
  const emailChangeHandler = async () => {
    const newMail = document.getElementById("email").value
    const password = document.getElementById("password").value
    if(newMail === "" || password == "") return 0
    document.getElementById("email").value = ""
    document.getElementById("password").value = ""
    const res = await doEmailChange(newMail,password)
    if (res.success) {
        toast.success('Email Changed Successfully ✅', {
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
            document.getElementById("email").value = newMail
    }
  }
  return (
    <div className='ProfilePage'>
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
        <h1>My Profile</h1>
        <div className='switchBtn'>
            <button>My Profile</button>
            <button>Subscription</button>
        </div>
        <div className='profileInfoHolder'>
            <h3 className='iconHolderInsideProfile'>
                <span className='UsericonInSideBar'>{userData?.fullName?.slice(0,2)}</span>
            </h3>
            <div className='textProfileData'>
                <div>
                    <label>Email</label>
                    {emailDisable && <input type='text' value={currentUser?.email} disabled={emailDisable} ></input>}
                    {!emailDisable && <input type='text' id='email' placeholder='type new email' ></input>}
                    {!emailDisable && <input type='text' id='password' placeholder='type password'></input>}
                    {!emailDisable && <button onClick={emailChangeHandler}>Save</button>}
                    {emailDisable && <button onClick={(e)=>setemailDisable(false)}>Change Email</button>}
                </div>
                <div>
                    <label>fullName</label>
                    <label>{userData?.fullName}</label>
                </div>
                <div>
                    <label>Phone Number</label>
                    <label>{userData?.phoneNumber || "Not Set Yet"}</label>
                </div>
                <div>
                    <label>Country</label>
                    <label>{userData?.pays || "Not Set Yet"}</label>
                </div>
                <div>
                    <label>City</label>
                    <label>{userData?.ville || "Not Set Yet"}</label>
                </div>
                <div>
                    <label>Devise</label>
                    <label>{userData?.devise || "Not Set Yet"}</label>
                </div>
            </div>
        </div>
        <div className='navigationFromProfile'>
            <Link to="/dashboard/chnage-profile">Modify My Profile</Link>
            <Link to="/dashboard/chnage-password">Chnage My Password</Link>
        </div>  
    </div>
  )
}

export default Profile