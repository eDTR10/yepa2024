
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'



export default function Dress2({products}:any) {
  
 

  function capitalizeFirst(text:any) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
  return (

    
    <div className="relative h-[100vh]  w-full max-w-5xl mx-auto overflow-hidden">
    
      <div className="  z-50  relative gap-2 w-full h-full flex-col flex items-center  justify-center">
        <h1 className=' text-[60px]  text-[#ca5a4c] md:text-lg bg-gradient-to-r bg-clip-text font-harlow  text-transparent 
       from-[#fd427a] via-purple-500 to-[#3730ff] animate-text '>My Mr. and Ms. Best Dressed</h1>
          {products?products.map((product:any, _index:any) => (
            <div
              key={product.id}
              className="  "
            >
              <Card
                className={cn(
                  'w-[200px] h-[300px] sm:w-[150px] sm:h-[200px]    cursor-grab active:cursor-grabbing shadow-lg transition-shadow',
                  product.color
                )}
              >
                <CardContent className="p-2 flex flex-col items-center justify-between h-full text-white">
                    <div className=' pointer-events-none relative flex justify-center w-full h-[100%] overflow-hidden'>
                        <img 
                    src={import.meta.env.VITE_URL+product.image} 
                    alt={product.title}
                    
                    className="w-full h-full rounded-sm object-cover mb-4"
                  />

                  <h3 className=" bg-white px-1 py-2 sm:py-1 sm:pb-0 rounded-sm mb-2 shadow-sm absolute bottom-0 text-md font-harlow text-[#ca5a4c] capitalize ">{ capitalizeFirst(product.title )}</h3>
                    </div>
                  
                  
                </CardContent>
              </Card>
            </div>
          )):""}
      </div>
      
    </div>
  )
}