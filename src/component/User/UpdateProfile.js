

import React, { Fragment,useState, useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";


import "./UpdateProfile.css";
import { clearErrors,updateProfile ,loadUser } from "../../actions/userAction";
import img from "../images/Profile.png";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

const UpdateProfile = () => {
    const navigate = useNavigate();  
    const dispatch = useDispatch();
    const alert = useAlert();

    const {user} = useSelector((state)=>state.user);
    const {isUpdated,error ,loading} = useSelector((state)=>state.profile);

    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [avatar,setAvatar]=useState("/Profile.png");
    const [avatarPreview,setAvatarPreview]=useState("/Profile.png");

    const updateProfileSubmit=(e)=>{
        e.preventDefault();

        const  myForm = new FormData();

        myForm.set("name",name);
        myForm.set("email",email);
        myForm.set("avatar",avatar);
        dispatch(updateProfile(myForm));
     }

     const updateProfileDataChange=(e)=>{
      const profile = new FileReader();
            profile.onload=()=>{
                if(profile.readyState===2){
                    setAvatarPreview(profile.result);
                    setAvatar(profile.result);
                }
            }
            profile.readAsDataURL(e.target.files[0]);
        };

        useEffect(()=>{
            if(user){
                setName(user.name);
                setEmail(user.email);
                setAvatarPreview(user.avatar.url);
            }

            if(error){
                alert.error(error);
                dispatch(clearErrors());
            }

            if(isUpdated){
            alert.success("Profile Updated Successfully");
            dispatch(loadUser());
            navigate("/account");
            dispatch({
                type:UPDATE_PROFILE_RESET
            });          
            }

        },[dispatch,error,alert,user,isUpdated]);

  return (
    <Fragment>
   {
    loading ? (<Loader/>):(
      <Fragment>
      <div className="updateProfileContainer">
      <div className="updateProfileBox">
        <h2 className="updateProfileHeading">Update Profile</h2>
<form className="updateProfileForm" encType="multipart/form-data" onSubmit={updateProfileSubmit}>
   
  <div className="updateProfileName">
    <FaceIcon/>
      <input type="text" placeholder="Name" required name="name" value={name} onChange={(e)=>setName(e.target.value)}/> 
 </div>

 <div className="updateProfileEmail">
   <MailOutlineIcon/> 
   <input type="email" placeholder="Email" required name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>     
 </div>

 <div id="updateProfileImage">
    <img src={avatarPreview} alt="Avatar Preview"/>
     <input type="file" name="avatar" accept="image/*" onChange={updateProfileDataChange}/>
 </div>

 <input type="submit" value="Update" className="updateProfileBtn"/>   
  </form>

  </div>
  </div>   
      
      </Fragment>
    )
   }
    </Fragment>
  )
}

export default UpdateProfile
