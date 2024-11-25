import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Product {
  id: number;
  title: string;
  image: string;
  color: string;
  voted: boolean;
}

export default function DressCarousel({ products, setProducts }: { 
  products: Product[], 
  setProducts: React.Dispatch<React.SetStateAction<Product[]>> 
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const startAutoPlay = useCallback(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // Only start new interval if not paused
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        if (!isDragging) {
          setCurrentIndex((prev) => (prev + 1) % products.length)
        }
      }, 3000) // Increased interval for smoother experience
    }
  }, [isDragging, isPaused, products.length])

  // Memoized effect for autoplay
  useEffect(() => {
    startAutoPlay()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [startAutoPlay])

  // Optimized drag handling
  const handleDragEnd = useCallback((_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false)
    const threshold = 100 // Increased threshold for more deliberate swipes

    if (Math.abs(info.offset.x) > threshold) {
      setCurrentIndex((prev) => 
        info.offset.x > 0 
          ? (prev - 1 + products.length) % products.length 
          : (prev + 1) % products.length
      )
    }

    startAutoPlay()
  }, [products.length, startAutoPlay])

  // Memoized card style calculation
  const getCardStyle = useCallback((index: number) => {
    const diff = (index - currentIndex + products.length) % products.length
    let adjustedDiff = diff
    
    if (diff > products.length / 2) {
      adjustedDiff = diff - products.length
    }
    
    const xOffset = adjustedDiff * 50 // Slightly reduced horizontal spread
    const opacity = 1 - Math.abs(adjustedDiff) * 0.3
    const scale = 1 - Math.abs(adjustedDiff) * 0.15
    const zIndex = products.length - Math.abs(adjustedDiff)
    const rotate = adjustedDiff * 3 // Reduced rotation for subtler effect

    return {
      x: xOffset,
      opacity,
      scale,
      zIndex,
      rotateY: rotate,
    }
  }, [currentIndex, products.length])

  // Optimized vote handling
  const handleVote = useCallback((id: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, voted: !product.voted }
          : { ...product, voted: false }
      )
    )

    // Toggle pause with more robust state management
    setIsPaused((prev) => {
      const newPausedState = !prev
      if (!newPausedState) {
        startAutoPlay()
      }
      return newPausedState
    })

    setCurrentIndex(products.findIndex((product) => product.id === id))
  }, [products, startAutoPlay, setProducts])

  // Memoized capitalization function
  const capitalizeFirst = useCallback((text: string) => 
    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase(), 
  [])

  // Render optimizations
  const renderedProducts = useMemo(() => 
    products?.map((product, index) => (
      <motion.div
        key={product.id}
        className="absolute"
        initial={getCardStyle(index)}
        animate={getCardStyle(index)}
        exit={{ opacity: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 20 
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        whileTap={{ cursor: 'grabbing' }}
        style={{ 
          position: 'absolute',
          left: '50%',
          translateX: '-50%',
        }}
      >
        <Card
          className={cn(
            'w-[200px] h-[300px] pb-2 cursor-grab active:cursor-grabbing shadow-lg transition-shadow',
            product.color
          )}
        >
          <CardContent className="p-2 flex flex-col items-center justify-between overflow-hidden h-full text-white">
            <div className='pointer-events-none rounded-sm relative justify-center items-center flex w-full h-[86%] overflow-hidden'>
              <img 
                src={import.meta.env.VITE_URL+product.image} 
                alt={product.title}
                className="w-full h-full rounded-sm object-cover mb-4"
              />
              <h3 className="bg-white px-1 py-1  rounded-sm self-center shadow-sm absolute bottom-0 text-md font-harlow text-[#ca4c85] capitalize">
                {capitalizeFirst(product.title)}
              </h3>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                handleVote(product.id)
              }}
              className={cn(
                "mt-2 transition-colors bg-black",
                product.voted ? "text-red-500" : "text-white"
              )}
            >
              <Heart 
                className={product.voted ? "h-5 w-5 mr-2 text-red-500" : "h-5 w-5 mr-2"} 
                fill={product.voted ? "red" : "none"} 
              />
              {product.voted ? "Voted" : "Vote"}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    )), 
    [products, getCardStyle, handleVote, capitalizeFirst]
  )

  return (
    <div className="relative h-[50vh] w-full max-w-5xl mx-auto overflow-hidden">
      <div className="absolute inset-0 flex items-center bg-red-400 justify-center">
        <AnimatePresence mode="popLayout">
          {renderedProducts}
        </AnimatePresence>
      </div>
    </div>
  )
}