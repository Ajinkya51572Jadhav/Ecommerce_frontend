
import { ALL_ORDERS_FAIL } from "../constants/orderConstants";
import { LOGIN_REQUEST ,
         LOGIN_SUCCESS ,
         LOGIN_FAIL ,

         REGISTER_USER_REQUEST,
         REGISTER_USER_SUCCESS,
         REGISTER_USER_FAIL,

         LOAD_USER_REQUEST,
         LOAD_USER_SUCCESS,
         LOAD_USER_FAIL,

         LOGOUT_SUCCESS,
         LOGOUT_FAIL,

        UPDATE_PROFILE_REQUEST,
        UPDATE_PROFILE_SUCCESS,
        UPDATE_PROFILE_FAIL,
        
        UPDATE_PASSWORD_REQUEST,
        UPDATE_PASSWORD_SUCCESS,
        UPDATE_PASSWORD_FAIL, 
  
        FORGOT_PASSWORD_REQUEST,
        FORGOT_PASSWORD_SUCCESS,
        FORGOT_PASSWORD_FAIL,

        RESET_PASSWORD_REQUEST,
        RESET_PASSWORD_SUCCESS,
        RESET_PASSWORD_FAIL,

         CLEAR_ERRORS,
         ALL_USER_REQUEST,
         ALL_USER_SUCCESS,
         DELETE_USER_REQUEST,
         DELETE_USER_SUCCESS,
         DELETE_USER_FAIL,
         USER_DETAIL_REQUEST,
         USER_DETAIL_SUCCESS,
         USER_DETAIL_FAIL,
         UPDATE_USER_REQUEST,
         UPDATE_USER_SUCCESS,
         UPDATE_USER_FAIL
        
        } from "../constants/userConstants";
import axios from "axios";

// login 

export const login = (email,password)=> async (dispatch)=>{
  
   try {
     dispatch({
        type:LOGIN_REQUEST
     })    
     const config = { headers :{"Content-Type":"application/json"}  };

      const {data }= await axios.post(`https://backend-ajinkya51572jadhav.vercel.app/api/v1/login`,
      {email, password},
      config);

      console.log("Login data",data);
       
          dispatch({
            type:LOGIN_SUCCESS,
            payload : data.user 
        }); 
    
    } catch (error) {
     console.log(error);
    dispatch({
        type : LOGIN_FAIL,
        payload:error.response.data.message  

    })
    }
}

          //  register 

export const register =(userData)=>async(dispatch)=>{
    try{ 
    dispatch({
        type:REGISTER_USER_REQUEST 
    });

    const config = {headers : {"Content-Type" :"multipart/form-data"}};
      
    const {data} = await axios.post(`https://backend-ajinkya51572jadhav.vercel.app/api/v1/register`,userData,config);
     
    console.log("register", data);

     dispatch({
        type:REGISTER_USER_SUCCESS ,
        payload :data.user
     })     

      
      }catch(error){
        console.log(error.response.data.message)
        dispatch({
            type:REGISTER_USER_FAIL ,
            payload :error.response.data.message 
           
         })
    }
};



//     load user 


      export const  loadUser = ()=>async (dispatch)=>{
            try {                 
                dispatch({
                    type:LOAD_USER_REQUEST
                  });
           const {data} = await axios.get(`https://backend-ajinkya51572jadhav.vercel.app/api/v1/me`);
           console.log("me load user",data);
           
           dispatch({
            type:LOAD_USER_SUCCESS,
            payload:data.user
          });
           
        } catch (error) {
            dispatch({
                type:LOAD_USER_FAIL,
                payload:error.response.data.message  //   data change error.response.data.message
            });
            }
    };


//     log-out user 


export const  logout=()=>async (dispatch)=>{
    try {                 
    
      await axios.get(`https://backend-ajinkya51572jadhav.vercel.app/api/v1/logout`);
   
   dispatch({
    type:LOGOUT_SUCCESS,
  })
   
} catch (error) {
    dispatch({
        type:LOGOUT_FAIL,
        payload:error.response.data.message  //   data change error.response.data.message
    })     
    }
};


 //        profile update 


          export const updateProfile=(userData)=>async(dispatch)=>{
            try{ 
            dispatch({
                type:UPDATE_PROFILE_REQUEST
            });
        
            const config = {headers : {"Content-Type" :"multipart/form-data"}};
              
            const {data} = await axios.put(`https://backend-ajinkya51572jadhav.vercel.app/api/v1/me/update`,userData,config);
             
            console.log("Update profile", data);
        
             dispatch({
                type:UPDATE_PROFILE_SUCCESS ,
                payload :data.success
             })             
              
              }catch(error){
                console.log(error.response.data.message)
                dispatch({
                    type:UPDATE_PROFILE_FAIL,
                    payload :error.response.data.message 
                   
                 })
            }
        };
        


   // updata  password
     
      

   export const updatePassword=(passwords)=>async(dispatch)=>{
    try{ 
    dispatch({
        type:UPDATE_PASSWORD_REQUEST
    });

    const config = {headers : {"Content-Type" :"application/json"}};
      
    const  {data} = await axios.put(`https://backend-ajinkya51572jadhav.vercel.app/api/v1/password/update`,passwords,config);
     
    console.log("Update Password", data);
                    
  

     dispatch({
        type:UPDATE_PASSWORD_SUCCESS ,
        payload :data.success
     })             


     dispatch({
        type:UPDATE_PASSWORD_FAIL,
        payload :data.message 
       
     })
      
      }catch(error){
        console.log(error.response.data.message)
        dispatch({
            type:UPDATE_PASSWORD_FAIL,
            payload :error.response.data.message
           
         })
    }
};


   //  forgot password
 
   
   export const forgotPassword=(email)=>async(dispatch)=>{
    try{ 
    dispatch({
        type:FORGOT_PASSWORD_REQUEST
    });

    const config = {headers : {"Content-Type" :"application/json"}};
      
    const  {data} = await axios.post(`https://backend-ajinkya51572jadhav.vercel.app/api/v1/password/forgot`,email,config);
     
    console.log("forgot login Password", data);                   
  

     dispatch({
        type:FORGOT_PASSWORD_SUCCESS ,
        payload :data.message
     })             
      
      }catch(error){
        console.log(error.response.data.message)
        dispatch({
            type:FORGOT_PASSWORD_FAIL,
            payload :error.response.data.message
           
         })
    }
};
 

        // reset password 

 export const resetPassword = ( token,password) =>async(dispatch)=>{
   
  try{
      dispatch({
        type:RESET_PASSWORD_REQUEST,
      });
     
     const config = {headers:{"Content-Type" :"application/json"} };   
      const {data} = await axios.put(`https://backend-ajinkya51572jadhav.vercel.app/api/v1/password/reset/${token}`,password,config);

      console.log("reset data ",data);
      dispatch({
        type:RESET_PASSWORD_SUCCESS,
        payload : data.success
       }) 

      }catch(error){
        dispatch({
          type:RESET_PASSWORD_FAIL,
          payload :error.response.data.message
        })
      }
    }



             // GET all user  _____________ (admin)
                  
          export const  alluser=()=> async(dispatch)=>{
                     
                 try{
                  dispatch({
                     type:ALL_USER_REQUEST
                  });

                  const {data} = await axios.get(`https://backend-ajinkya51572jadhav.vercel.app/api/v1/admin/users`);
                   console.log("all user",data)
                  dispatch({
                    type:ALL_USER_SUCCESS, 
                    payload : data.users 
                 });

                 }catch(error){
                       dispatch({
                          type:ALL_ORDERS_FAIL,
                          payload : error.response.data.message
                       });
                 }
            }  


            ///    get single user 

              export const getUserDetail =(id)=>async(dispatch)=>{

                try{
                  dispatch({
                    type:USER_DETAIL_REQUEST,
                  });

                 const {data} = await axios.get(`https://backend-ajinkya51572jadhav.vercel.app/api/v1/admin/user/${id}`);
                      console.log("user detail",data);
                  dispatch({
                     type:USER_DETAIL_SUCCESS,
                     payload:data.user 
                    });

                }catch(error){
                        dispatch({
                          type:USER_DETAIL_FAIL,
                          payload:error.response.data.message 
                        });
                          
                      };
                    }
                  

                       //         update user        
                                      
                export  const  updateUser=(id,userData)=>async(dispatch)=>{
                           
                      try {
                        dispatch({
                         type:UPDATE_USER_REQUEST
                        });

                        const config = {
                          headers:{
                               "Content-Type":"application/json" 
                          }
                        };
                 
                        const {data} = await axios.put(`https://backend-ajinkya51572jadhav.vercel.app/api/v1/admin/user/${id}`,userData,config);

                        dispatch({
                          type:UPDATE_USER_SUCCESS,
                           payload:data.success
                        });

                      } catch (error) {
                         dispatch({
                          type:UPDATE_USER_FAIL,
                          payload:error.response.data.message    
                        });
                      }
                }








                   //    delete user id  ______(admin)

                    export const  deleteUser =(id)=>async(dispatch)=>{
                              try {
                                  dispatch({
                                    type:DELETE_USER_REQUEST,
                                  });
 
                                const {data} = await axios.delete(`https://backend-ajinkya51572jadhav.vercel.app/api/v1/admin/user/${id}`)

                                  dispatch({
                                   type:DELETE_USER_SUCCESS,  
                                   payload: data
                                  });


                              } catch (error) {
                                dispatch({
                                  type:DELETE_USER_FAIL,
                                  payload : error.response.data.message                                   
                                });
                              }
                    }   










// Clearing ERRor
  
     export const clearErrors =()=>async(dispatch)=>{
         dispatch({
            type:CLEAR_ERRORS
         })
     }































     