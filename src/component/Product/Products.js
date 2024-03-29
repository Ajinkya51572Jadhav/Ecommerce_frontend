import { Fragment, useEffect, useState } from 'react'
import {useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useParams } from 'react-router-dom';
import Pagination from  "react-js-pagination"
import Slider from "@material-ui/core/Slider";
import { Typography } from '@material-ui/core';



import "./Products.css"
// import ProductCard from "./ProductCard.js"
// import MetaData from '../layout/MetaData';
import { cleareErrors, getProduct } from '../../actions/ProductAction';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';


   const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Camera",
    "SmartPhones",
    "Tv",
    "Other"
  ];


const Products = () => {
  
  const  params = useParams();
  const dispatch = useDispatch();
 
  const alert = useAlert();  
  
  const [currentPage,setCurrentPage]=useState(1);   
  const [price,setPrice]=useState([0,25000]);
  const [category,setCategory]=useState("");
  const [ratings,setRatings]=useState(0); 

    
  // const {products,error,loading ,productsCount , resultPerPage}=useSelector((state)=>state.products);

  const {products,loading ,error,productsCount, resultPerPage, filteredProductsCount } = useSelector((state)=>state.products);
    console.log(productsCount , resultPerPage , products);
      
     const keyword  = params.keyword;
       console.log(keyword);

const setCurrentPageNo=(e)=>{
  console.log(e);
    setCurrentPage(e);
}

const priceHandler=(event,newPrice)=>{              // data change 
    setPrice(newPrice);      
}

const categoryHandler=(category)=>{
  setCategory(category);
 }


const ratingsHandler=(e,index)=>{
   setRatings(index);   
}

  useEffect(()=>{

    if(error){
      alert.error(error);
      dispatch(cleareErrors());
    }
     dispatch(getProduct(keyword,currentPage,price,category,ratings));       ///data change 
 
  },[dispatch,keyword,currentPage,price,category,ratings,alert,error]);

      console.log(category);
   
  let count = filteredProductsCount;
  
  return (
    <Fragment>
    {
      loading ?(<Loader/>):(
       
        <Fragment>
            
          <h2 className='productsHeading'>Products</h2>
           <div className='products'>
  {

    products && products.map((product)=>{
      return(
        <ProductCard key={product._id} product={product} /> 
      )
    })
    
      
  }
           </div>


  <div className='filterBox'>
      <Typography>Price</Typography> 
<Slider value={price} onChange={priceHandler} valueLabelDisplay="auto" aria-labelledby="range-slider"
      min={0}  max={25000} />     
      


      <Typography>Categories</Typography>
      <ul className='categoryBox'>
      {
        categories.map((category)=>(
  <li className='category-link' key={category} onClick={()=>categoryHandler(category)}>{category}</li>
          
        ))
      }
      </ul>

            <fieldset>
      <Typography component="legend">Ratings Above</Typography>
      <Slider
        value={ratings}
         onChange={(e, newRating)=>ratingsHandler(e,newRating)}
        aria-labelledby="continuous-slider"
        valueLabelDisplay="auto"
        min={0}
        max={5}
      />
    </fieldset>
      
      
  </div>
           
    {/*   resultPerPage < count && */}

     <div className='paginationBox'>
           <Pagination
           activePage={currentPage}
           itemsCountPerPage={resultPerPage} 
           totalItemsCount={productsCount} 
           onChange={setCurrentPageNo}
           nextPageText="Next"
           prevPageText="Prev"
           firstPageText="1st"
           lastPageText="Last"
           itemClass="page-item"
           linkClass="page-link"
           activeClass="pageItemActive"
           activeLinkClass="pageLinkActive"
         />         
         </div>
       
         </Fragment>
      )
        }
    </Fragment>
  )
}


export default Products
















