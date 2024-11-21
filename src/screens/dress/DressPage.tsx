import { useEffect, useState } from 'react';
import Girl1 from './../../assets/1.jpg';
import Girl2 from './../../assets/2.jpg';
import Girl3 from './../../assets/3.jpg';
import Girl4 from './../../assets/4.jpg';
import Girl5 from './../../assets/5.jpg';
import Girl6 from './../../assets/6.jpg';

import Boy1 from "./../../assets/b1.jpg";
import Boy2 from "./../../assets/b2.jpg";
import Boy3 from "./../../assets/b3.jpg";
import Boy4 from "./../../assets/b4.jpg";
import Boy5 from "./../../assets/b5.jpg";
import Boy6 from "./../../assets/b6.jpg";




import Dress from './Dress';
import './card.css'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
interface Product {
  id: number;
  title: string;
  color: string;
  image: string;
  voted: boolean;
}

function DressPage() {
    const navigate = useNavigate();
    useEffect(() => {
        const data = localStorage.getItem("mr&ms");
        const name = localStorage.getItem("name");

        if (!name) {
          navigate("/yepa2024/login")
          
        }
        if (data) {
            navigate("/yepa2024/vote/done")
        }
      }, []);
      

  const [products, setProducts] = useState<Product[]>([
    { id: 1, title: 'Sofia Arlo', color: 'bg-blue-500', image: Girl1, voted: false },
    { id: 2, title: 'Chares Malik', color: 'bg-purple-500', image: Girl2, voted: false },
    { id: 3, title: 'Gabi Luiya', color: 'bg-pink-500', image: Girl3, voted: false },
    { id: 4, title: 'Wenny Rosas', color: 'bg-orange-500', image: Girl4, voted: false },
    { id: 5, title: 'Reshie Uklos', color: 'bg-green-500', image: Girl5, voted: false },
    { id: 6, title: 'Shopee May', color: 'bg-yellow-500', image: Girl6, voted: false },
    { id: 7, title: 'Rose Mar', color: 'bg-red-500', image: Girl3, voted: false },
  ]);

  const [products2, setProducts2] = useState<Product[]>([
    { id: 1, title: "John Carter", color: "bg-blue-500", image: Boy1, voted: false },
    { id: 2, title: "Michael Smith", color: "bg-purple-500", image: Boy2, voted: false },
    { id: 3, title: "Chris Evans", color: "bg-pink-500", image: Boy3, voted: false },
    { id: 4, title: "David Brown", color: "bg-orange-500", image: Boy4, voted: false },
    { id: 5, title: "James Wilson", color: "bg-green-500", image: Boy5, voted: false },
    { id: 6, title: "Andrew Lee", color: "bg-yellow-500", image: Boy6, voted: false },
    { id: 7, title: "Ryan Moore", color: "bg-red-500", image: Boy3, voted: false },
  ]);

  // Function to check if any product has been voted for
  const hasVoted = () => {
    return products.some((product) => product.voted) &&  products2.some((product) => product.voted);
  };

  const [ip, setIp] = useState<string>('');

  // Function to check if any product has been voted for


  // Function to fetch products with voted = true
  const getVotedData = () => {
    const votedProducts = [
      ...products.filter((product) => product.voted),
      ...products2.filter((product) => product.voted),
    ];
    return votedProducts;
  };

  // Function to get device IP
  const fetchIp = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      setIp(data.ip);
    } catch (error) {
      console.error('Error fetching IP:', error);
    }
  };

  // Call fetchIp on component mount
  useEffect(() => {
    fetchIp();
  }, []);

  const handleSubmit = () => {
    const votedData = getVotedData();
    if (!votedData.length) {
      alert('No votes have been cast!');
      return;
    }
    let data = {ip,

        votedData
    }
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Your vote has been saved",
        showConfirmButton: false,
        timer: 1500
      });
    localStorage.setItem("mr&ms",JSON.stringify(data))

    // Prevent voting again by saving the IP (you could use local storage or send it to a server)
    setInterval(()=>{
        navigate("/yepa2024/vote/done")
    },1000)
  };

  return (
    <div className="w-full h-full flex items-center flex-col justify-center">
   
      <Dress products={products} setProducts={setProducts} />
      <Dress products={products2} setProducts={setProducts2} />

      {/* Show button if any product is voted */}
      {hasVoted() ?
      (
        /* From Uiverse.io by Itskrish01 */ 
<button
  className=" absolute z-50 inline-flex h-12 active:scale-95 transistion overflow-hidden rounded-lg p-[1px] focus:outline-none animate-bounce"

  onClick={handleSubmit}
>
  <span
    className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ca5a4c_0%,#ffc764_50%,#64a4c1_100%)]"
  >
  </span>
  <span
    className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 undefined"
  >
    Submit Vote
  </span>
</button>

      ):(
        <h1 className="absolute z-50 font-harlow text-3xl text-center text-[#a80b39]">Mr. and Ms. Best Dressed </h1>
      )
      
    
    }
    </div>
  );
}

export default DressPage;
