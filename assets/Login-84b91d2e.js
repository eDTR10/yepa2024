import{r,u as c,j as e}from"./index-e2b9183e.js";/* empty css              */import{S as i}from"./sweetalert2.esm.all-509645c6.js";const m="/yepa2024/yepa.png";function u(){const n=["settie","eugene","lourdes","alawi","raposala","batoon"];r.useEffect(()=>{const s=localStorage.getItem("name");s&&(n.some(l=>s.toLowerCase().includes(l))||o("/yepa2024/vote"))},[]);const o=c(),[a,t]=r.useState("");return e.jsxs("div",{className:" mains w-screen h-screen overflow-hidden relative  flex items-center justify-center",children:[e.jsx("div",{className:" sunburst-bg w-screen h-screen flex items-center  absolute z-[-1]"}),e.jsxs("form",{className:"fire animate__animated animate__backInDown z-10 w-[95%] flex-col  pt-3 max-w-[500px] px-5 flex bg-[#ffc764] drop-shadow-md rounded-[70px] relative overflow-hidden pb-10",onSubmit:s=>{s.preventDefault(),n.some(l=>a.toLowerCase().includes(l))?(alert("Name is valid!"),t("")):(i.fire({position:"center",icon:"success",title:`Welcome to YEPA 2k24 ${a.toUpperCase()}`,showConfirmButton:!1,timer:1500}),localStorage.setItem("name",a),o("/yepa2024/vote"),t(""))},children:[e.jsx("div",{className:"absolute h-full w-full inset-0 bg-gradient-to-b from-[#a80b39] to-[#ff6347]  "}),e.jsxs("div",{className:"relative w-full h-full bg-[#ffc764]  rounded-[70px] pb-10",children:[e.jsx("img",{src:m,className:"w-full h-40 object-contain",alt:""}),e.jsxs("div",{className:" flex gap-10 flex-col",children:[e.jsxs("div",{className:" flex flex-col gap-0  items-center",children:[e.jsx("h1",{className:" translate-y-3 drop-shadow-md font-harlow text-[#ca5a4c] text-6xl mr-2 tracking-tighter",children:"Welcome to"}),e.jsxs("p",{className:" text-sm text-center font-lovelo-black text-white tracking-tighter",children:["2024 Year-End Performance ",e.jsx("br",{})," Assessment and Recognition"]})]}),e.jsx("input",{type:"text",name:"username",required:!0,value:a,onChange:s=>{t(s.target.value)},className:"input w-[70%] self-center font-lovelo-black",placeholder:"Enter Name"}),e.jsxs("button",{className:" w-[40%] self-center",children:[e.jsx("span",{className:"shadow"}),e.jsx("span",{className:"edge"}),e.jsx("span",{className:"front  font-harlow ",children:" Submit"})]})]})]})]})]})}export{u as default};
