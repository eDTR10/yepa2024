import React from 'react'
import ReactDOM from 'react-dom/client'
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import App from './App.tsx'
import './index.css'
import { Suspense, lazy } from "react";

import NotFound from "./screens/notFound";
import Loader from './components/loader/loader.tsx';

const Page1 = lazy(() =>
  wait(1300).then(() => import("./screens/page1.tsx"))
);

const Page2 = lazy(() =>
  wait(1300).then(() => import("./screens/page2.tsx"))
);

const Login = lazy(() =>
  wait(1300).then(() => import("./screens/login/Login.tsx"))
);

const PerformanceBattle = lazy(() =>
  wait(1300).then(() => import("./screens/performance-battle/PerformanceBattleContainer.tsx"))
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
            <Page1 />
          </Suspense>
        </>,
      },
      {
        path: "/yepa2024/vote",
        element: <Navigate to="/yepa2024/vote/performance-battle" />,
      },
      {
        path: "/yepa2024/vote/performance-battle",
        element: <>
          <Suspense fallback={<Loader />}>
            <PerformanceBattle />
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

function wait(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
