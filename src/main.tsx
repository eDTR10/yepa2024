import React from 'react'
import ReactDOM from 'react-dom/client'
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import App from './App.tsx'
import './index.css'
import { Suspense, lazy } from "react";

import NotFound from "./screens/notFound";
import Loader from './components/loader/loader.tsx';




const Login = lazy(() =>
  wait(3000).then(() => import("./screens/login/Login.tsx"))
);

const DressPage = lazy(() =>
  wait(1300).then(() => import("./screens/dress/DressPage.tsx"))
);

const SubmittedDressPage  = lazy(() =>
  wait(1300).then(() => import("./screens/dress/SubmittedDressPage.tsx"))
);


const router = createBrowserRouter([
  {

    path: "/yepa2024",
    element: <Navigate to="/yepa2024/login" />,
  },
  {
    path: "/yepa2024/login",
    element: <>
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
    </>,
  },
  {
    path: "/yepa2024/Dress",
    element: <>
      <Suspense fallback={<Loader />}>
        <DressPage />
      </Suspense>
    </>,
  },
  {
    path: "/yepa2024/vote",
    element: <App />,
    children: [
      {
        path: "/yepa2024/vote",
        element: <Navigate to="/yepa2024/vote/mrqen" />,
      },
      {
        path: "/yepa2024/vote/mrqen",
        element: <>
          <Suspense fallback={<Loader />}>
            <DressPage />
          </Suspense>
        </>,
      },
      {
        path: "/yepa2024/vote/done",
        element: <>
          <Suspense fallback={<Loader />}>
            <SubmittedDressPage/>
          </Suspense>
        </>,
      },
    ]
  },
  
  {
    path: "*",
    element: <NotFound />,
  },


 


]);

function wait( time:number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
