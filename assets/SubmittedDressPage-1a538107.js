import{j as e,C as c,a as n,b as o,r as i,u as x}from"./index-fe22c9bc.js";import"./card-4ed993c7.js";function d({products:s}){function t(a){return a.charAt(0).toUpperCase()+a.slice(1).toLowerCase()}return e.jsx("div",{className:"relative h-[100vh]  w-full max-w-5xl mx-auto overflow-hidden",children:e.jsxs("div",{className:"  z-50  relative gap-2 w-full h-full flex-col flex items-center  justify-center",children:[e.jsx("h1",{className:` text-[60px]  text-[#ca5a4c] md:text-lg bg-gradient-to-r bg-clip-text font-harlow  text-transparent \r
       from-[#fd427a] via-purple-500 to-[#3730ff] animate-text `,children:"My Mr. and Ms. Best Dressed"}),s?s.map((a,r)=>e.jsx("div",{className:" animate__animated  animate__wobble animate__repeat-3",children:e.jsx(c,{className:n("w-[200px] h-[300px] sm:w-[150px] sm:h-[200px]    cursor-grab active:cursor-grabbing shadow-lg transition-shadow",a.color),children:e.jsx(o,{className:"p-2 flex flex-col items-center justify-between h-full text-white",children:e.jsxs("div",{className:" pointer-events-none relative flex justify-center w-full h-[100%] overflow-hidden",children:[e.jsx("img",{src:"https://edtr.pythonanywhere.com"+a.image,alt:a.title,className:"w-full h-full rounded-sm object-cover mb-4"}),e.jsx("h3",{className:" bg-white px-1 py-2 sm:py-1 sm:pb-0 rounded-sm mb-2 shadow-sm absolute bottom-0 text-md font-harlow text-[#ca5a4c] capitalize ",children:t(a.title)})]})})})},a.id)):""]})})}function h(){const[s,t]=i.useState([]);i.useEffect(()=>{const r=localStorage.getItem("mr&ms");if(r)try{const l=JSON.parse(r);t(l.votedData||[])}catch(l){console.error("Error parsing localStorage data:",l)}else a("/yepa2024")},[]),i.useEffect(()=>{console.log(s,"asdasd")},[s]);let a=x();return e.jsxs("div",{className:"w-full h-full flex items-center flex-col justify-center",children:[e.jsxs("div",{className:" bubbling-heart absolute h-screen w-screen  z-[60]  ",children:[e.jsx("div",{children:e.jsx("i",{className:"fa fa-heart fa-5x"})}),e.jsx("div",{children:e.jsx("i",{className:"fa fa-heart fa-5x"})}),e.jsx("div",{children:e.jsx("i",{className:"fa fa-heart fa-5x"})}),e.jsx("div",{children:e.jsx("i",{className:"fa fa-heart fa-5x"})})]}),e.jsx(d,{products:s,setProducts:t})]})}export{h as default};