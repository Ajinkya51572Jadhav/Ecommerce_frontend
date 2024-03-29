

import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";

import "./Shipping.css";
import { saveShippingInfo } from "../../actions/cartAction";
import CheckoutSteps from "../Cart/CheckoutSteps"
import { useNavigate } from "react-router-dom";


const Shipping = () => {
     const navigate =useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const {shippingInfo}  = useSelector((state)=>state.cart);
    
         const[address,setAddress]=useState(shippingInfo.address);
         const[city,setCity]=useState(shippingInfo.city);
         const[state,setState]=useState(shippingInfo.state);
         const[country,setCountry]=useState(shippingInfo.country);
         const[pinCode,setPincode]=useState(shippingInfo.pinCode);
         const[phoneNo,setPhoneNo]=useState(shippingInfo.phoneNo)

        
        function shippingSubmit(e){
          e.preventDefault();

                     if(  phoneNo.length < 10 || phoneNo.length > 10 ){
                            alert.error("Phone Number Should Be 10 Deight");
                               return;
                      }

              dispatch(saveShippingInfo({address,city,state,country,pinCode,phoneNo}));
              navigate("/order/confirm");
         }

    
      
            console.log(shippingInfo);
  return (
    <Fragment>
            
               <CheckoutSteps activeStep={0}/>

      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>

     <form className="shippingForm" encType="multipart/form-data" onSubmit={shippingSubmit}>
        
     <div>
     <HomeIcon/>
      <input type="text" name="address" required value={address} placeholder="Address" onChange={(e)=>setAddress(e.target.value)}/>
     </div>
   
     <div>
     <LocationCityIcon/>
     <input type="text" name="city" required value={city} placeholder="City" onChange={(e)=>setCity(e.target.value)}/>
    </div>
  
   
   
     <div>
     <PinDropIcon/>
      <input type="number" name="pincode" required value={pinCode} placeholder="PinCode" onChange={(e)=>setPincode(e.target.value)}/>
     </div>
   
     <div>
     <PhoneIcon />
      <input type="number" name="phoneNo" required value={phoneNo} placeholder="PhoneNo" onChange={(e)=>setPhoneNo(e.target.value)}/>
     </div>
   
 
     <div>
     <PublicIcon/>
      <select  required value={country}  onChange={(e)=>setCountry(e.target.value)}>
      <option value={""}>Country</option>
      {
        Country.getAllCountries().map((item)=>(
          <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
        ))
      }
      
     </select>
     </div>


     {
      country && (
        <div>
        <TransferWithinAStationIcon/>
          <select required value={state}  onChange={(e)=>setState(e.target.value)}>
              <option value={''}>State</option>
              {
                State.getStatesOfCountry(country).map((item)=>(
                   <option key={item.isoCode}  value={item.isoCode}>{item.name}</option>
                ))
              }
              

          </select>
         </div>
      )
     }

      <input type="submit" value={"Continue"} className="shippingBtn" disabled={state ? false : true} />
   
     </form>



        </div>
      </div>
     
    </Fragment>
  )
}

export default Shipping
