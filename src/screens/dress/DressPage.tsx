import { useEffect, useState, useTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import Dress from './Dress';
import './card.css';
import axios from './../../plugin/axios';
import Swal from 'sweetalert2';
import { LoaderIcon } from 'lucide-react';

interface Contestant {
  uid: number;
  name: string;
  photos: string;
}

interface Product {
  id: number;
  title: string;
  color: string;
  image: string;
  voted: boolean;
}

interface VotePayload {
  ip: string;
  voted_to: number;
  name: string;
  event_type: number;
}

const DressPage = () => {
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [products2, setProducts2] = useState<Product[]>([]);
  const [ip, _setIp] = useState<any>(localStorage.getItem("ip")?localStorage.getItem("ip"):"");
  const [isLoading, setIsLoading] = useState(true);

  const DEFAULT_IMAGE = "/media/photos/DICT_Sub-brandLogo_for_dark_backgrounds.png";

  const transformContestantData = (contestants: Contestant[], eventType: number): Product[] => {
    return contestants.map(item => ({
      id: item.uid,
      title: item.name || (eventType === 1 ? "Maria" : "John Doe"),
      color: eventType === 1 ? ` bg-gradient-to-t  
       from-[#feafc7] to-[#fd427a] ` : `bg-gradient-to-t  
       from-[#a4c5fb] to-[#3b82f6]`,
      image: item.photos || DEFAULT_IMAGE,
      voted: false
    }));
  };

  const fetchContestants = async (abortController: AbortController) => {
    try {
      setIsLoading(true);
      const response = await axios.get("contestant/all/", {
        signal: abortController.signal
      });
      
      startTransition(() => {
        setProducts(transformContestantData(response.data.event_type_1, 1));
        setProducts2(transformContestantData(response.data.event_type_0, 0));
      });
    } catch (error) {
      if (!abortController.signal.aborted) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Failed to fetch contestants",
          showConfirmButton: false,
          timer: 1500
        });
        console.error('Error fetching contestants:', error);
      }
    } finally {
      if (!abortController.signal.aborted) {
        setIsLoading(false);
      }
    }
  };

 

  const submitVote = async (voteData: VotePayload[]) => {
    try {
      await axios.post('vote/all/', voteData);
      
      localStorage.setItem("mr&ms", JSON.stringify({ ip, votedData: getVotedData() }));
      
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your vote has been saved",
        showConfirmButton: false,
        timer: 1500
      });
      
      setLoading(false);
      
      // Wrap navigation in startTransition
      startTransition(() => {
        setTimeout(() => {
          navigate("/yepa2024/vote/done");
        }, 1000);
      });
    } catch (error) {
      setLoading(false);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Your vote has been Stock",
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  useEffect(() => {
    const name = localStorage.getItem("name");
    const previousVote = localStorage.getItem("mr&ms");
 


    if (!name) {
      startTransition(() => {
        navigate("/yepa2024/login");
      });
      return;
    }

    if (previousVote) {
      startTransition(() => {
        navigate("/yepa2024/vote/done");
      });
      return;
    }

    const abortController = new AbortController();
    
    fetchContestants(abortController);


    return () => {
      abortController.abort();
    };
  }, [navigate]);

  const getVotedData = () => [
    ...products.filter(product => product.voted),
    ...products2.filter(product => product.voted)
  ];

  const hasVoted = () => 
    products.some(product => product.voted) && 
    products2.some(product => product.voted);

  const handleSubmit = () => {
    setLoading(true);
    const votedData = getVotedData();
    if (!votedData.length) {
      setLoading(false);
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "No votes have been cast!",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    const name = localStorage.getItem("name") || "";
    const votePayload: VotePayload[] = [
      {
        ip,
        voted_to: votedData[0].id,
        name,
        event_type: 1
      },
      {
        ip,
        voted_to: votedData[1].id,
        name,
        event_type: 0
      }
    ];

    submitVote(votePayload);
  };

  if (isLoading || isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center flex-col justify-center">
      {!hasVoted() && (
        <div className="text-3xl text-center absolute z-[1000] font-semibold 
          bg-gradient-to-r bg-clip-text font-harlow text-transparent 
          from-[#fd427a] via-purple-500 to-[#3730ff] animate-text">
          Mr. and Ms. Best Dressed
        </div>
      )}

      <Dress products={products} setProducts={setProducts} />
      <Dress products={products2} setProducts={setProducts2} />

      {hasVoted() && (
        <button
          className={!loading 
            ? "absolute z-50 inline-flex h-12 active:scale-95 transistion overflow-hidden rounded-lg p-[4px] focus:outline-none animate-bounce"
            : "absolute z-50 inline-flex h-12 active:scale-95 transistion overflow-hidden rounded-lg p-[1px] focus:outline-none animate-bounce pointer-events-none"}
          onClick={handleSubmit}
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ca5a4c_0%,#ffc764_50%,#64a4c1_100%)]">
          </span>
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 undefined">
            {!loading ? "Submit Vote" : "Sending Vote"}
            <LoaderIcon className={loading ? "w-4 h-4 animate-spin" : "hidden w-4 h-4 animate-spin"}/>
          </span>
        </button>
      )}
    </div>
  );
};

export default DressPage;