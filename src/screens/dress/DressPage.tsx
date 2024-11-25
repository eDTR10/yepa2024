import { useEffect, useState } from 'react';




import Dress from './Dress';
import './card.css'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from './../../plugin/axios';
interface Product {
  id: number;
  title: string;
  color: string;
  image: string;
  voted: boolean;
}

function DressPage() {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);

  
    const [products2, setProducts2] = useState<Product[]>([]);

    function Voting(data:any){
      axios.post('vote/all/',data).then((e:any)=>{
        console.log(e.data)
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your vote has been saved",
          showConfirmButton: false,
          timer: 1500
        });
      }).catch((_e:any)=>{
        Swal.fire({
          position: "center",
          icon:"error",
          title: "Your vote has been Stock",
          showConfirmButton: false,
          timer: 1500
        });
      })
    }
    console.log("rerender")
    function GetPartcipance() {

      
      axios.get("contestant/all/").then((e:any)=>{
        const transformedData = e.data.event_type_1.map((item:any) => ({
          id: item.uid,
          title: item.name || "Maria", // Fallback if name is null
          color: "bg-pink-500",         // Assign a default color
          image: item.photos || "/media/photos/DICT_Sub-brandLogo_for_dark_backgrounds.png", // Fallback image if photos is null
          voted: false                  // Default value
      }));
      const transformedData0 = e.data.event_type_0.map((item:any) => ({
        id: item.uid,
        title: item.name || "John Doe", // Fallback if name is null
        color: "bg-blue-500",         // Assign a default color
        image: item.photos || "/media/photos/DICT_Sub-brandLogo_for_dark_backgrounds.png", // Fallback image if photos is null
        voted: false                  // Default value
    }));
        setProducts(transformedData)
        setProducts2(transformedData0)

        

      })
      
    }
    useEffect(() => {

      GetPartcipance()


        const data = localStorage.getItem("mr&ms");
        const name = localStorage.getItem("name");

        if (!name) {
          navigate("/yepa2024/login")
          
        }
        if (data) {
            navigate("/yepa2024/vote/done")
        }
      }, []);
      

  

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


  const transformData = (currentData:any, ip:any, name:any) => {
    return [
      {
        ip:ip,
        voted_to: currentData[0].id,
        name:name,
        "event_type":1
      },
      {
        ip,
        voted_to: currentData[1].id,
        name,
        "event_type":0
      }
    ];
  };


  const handleSubmit = () => {
    const votedData = getVotedData();
    if (!votedData.length) {
      alert('No votes have been cast!');
      return;
    }
    let data = {ip,

        votedData
    }
      let name = localStorage.getItem("name")?localStorage.getItem("name"):""
      let votes = [votedData]
      let body =transformData(votes[0] ,ip,name)
      Voting(body)
    localStorage.setItem("mr&ms",JSON.stringify(data))

    // Prevent voting again by saving the IP (you could use local storage or send it to a server)
    setTimeout(()=>{
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
