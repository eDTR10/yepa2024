import { useEffect, useState } from "react";

import "./card.css";

import Dress2 from "./Dress2";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import './heart.css'
interface Product {
  id: number;
  title: string;
  color: string;
  image: string;
  voted: boolean;
}



function SubmittedDressPage() {
  const [products, setProducts] = useState<Product[]>([]);


  useEffect(() => {
    const data = localStorage.getItem("mr&ms");
  
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        // Set the entire votedData array to products
        setProducts(parsedData.votedData || []);
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }
    } else {
        navigate("/yepa2024")
    }
  }, []);
  
  

  useEffect(()=>{
    console.log(products, "asdasd")
},[products])
    let navigate = useNavigate()
  return (
    <div className="w-full h-full flex items-center flex-col justify-center">
      <div className=" bubbling-heart absolute h-screen w-screen  z-[60]  ">
      <div><i className="fa fa-heart fa-5x"></i></div>
      <div><i className="fa fa-heart fa-5x"></i></div>
      <div><i className="fa fa-heart fa-5x"></i></div>
      <div><i className="fa fa-heart fa-5x"></i></div>
    </div>
        <Button className=" absolute top-0 right-0 z-[100]" onClick={()=>{
           
            navigate("/yepa2024")
            localStorage.clear()
        }}>clear</Button>
      <Dress2 products={products} setProducts={setProducts} />
     
    </div>
  );
}

export default SubmittedDressPage;
