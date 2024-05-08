import React , {useEffect , useState} from 'react'

import { useAuth } from '../contexts/authContext'

import { doSignOut } from '../firebase/auth';
import { MdOutlineInsights } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { GoPackage } from "react-icons/go";
import { GrTransaction } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { IoMdHelp } from "react-icons/io";

import { doc , getDoc} from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';

function SideBar() {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState({});
  const navigate = useNavigate()
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
  
  return (
    <div className='UserSideBar'>

      <h3 className='iconHolder'>
        <span className='UsericonInSideBar'>{userData?.fullName?.slice(0,2)}</span>
        <span className='UserNameInSideBar'>{userData?.fullName}</span>
      </h3>

      <div className='insideSideHolderLinks'>
        <div><MdOutlineInsights /> Statics</div>
        <div><SlCalender /> Calender</div>
        <div onClick={()=>navigate("/dashboard/stock")}><GoPackage /> Stock</div>
        <div><GrTransaction/> Transactions</div>
        <div onClick={()=>navigate("/dashboard/profile")}><CgProfile/> Profile</div>
        <div><IoMdHelp/> Help</div>
      </div>
      <button onClick={doSignOut} className='logoutBtn'>Logout</button>
    </div>
  )
}

export default SideBar