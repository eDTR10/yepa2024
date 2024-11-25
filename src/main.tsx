import React from 'react'
import ReactDOM from 'react-dom/client'
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";

import './index.css'
import { Suspense, lazy } from "react";

import NotFound from "./screens/notFound";
import Loader from './components/loader/loader.tsx';
import SettingsContainer from './screens/settings/SettingsContainer.tsx';
import App from './App.tsx';
import ChooseCategory from './screens/choose-category/ChooseCategory.tsx';
import DashboardContainer from './screens/admin/layouts/DashboardContainer.tsx';
import DashboardRating from './screens/admin/layouts/DashboardRating.tsx';




const Login = lazy(() =>
  wait(3000).then(() => import("./screens/login/Login.tsx"))
);

const DressPage = lazy(() =>
  wait(1300).then(() => import("./screens/dress/DressPage.tsx"))
);

const SubmittedDressPage = lazy(() =>
  wait(1300).then(() => import("./screens/dress/SubmittedDressPage.tsx"))
);

const MainDress = lazy(() =>
  wait(1300).then(() => import("./screens/dress/MainDress.tsx"))
);


const PerformanceBattle = lazy(() =>
  wait(1300).then(() => import("./screens/performance-battle/PerformanceBattleContainer.tsx"))
);

const Setting = lazy(() =>
  wait(1300).then(() => import("./screens/settings/SettingsContainer.tsx"))
);

const Dashboard = lazy(() =>
  wait(1300).then(() => import("./screens/admin/Dashboard.tsx"))
);

const PBCards = lazy(() =>
  wait(1300).then(() => import("./screens/admin/layouts/PBCard.tsx"))
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
    path: "/yepa2024/chosen-category",
    element: <>
      <Suspense fallback={<Loader />}>
        <ChooseCategory />
      </Suspense>
    </>,
  },
  {
    path: "/yepa2024/vote",
    element: <MainDress />,
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
            <SubmittedDressPage />
          </Suspense>
        </>,
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
    path: "/yepa2024/admin",
    element: <App />,
    children: [
      {
        path: "/yepa2024/admin",
        element: <Navigate to="/yepa2024/admin/dashboard" />,
      },
      {
        path: "/yepa2024/admin/dashboard",
        element: <>
          <Suspense fallback={<Loader />}>
            <Dashboard />
          </Suspense>
        </>,
      },
      {
        path: "/yepa2024/admin",
        element: <Navigate to="/yepa2024/admin/participants" />,
      },
      {
        path: "/yepa2024/admin/participants",
        element: <>
          <Suspense fallback={<Loader />}>
            <DashboardContainer />
          </Suspense>
        </>,
      },
      {
        path: "/yepa2024/admin",
        element: <Navigate to="/yepa2024/admin/ratings" />,
      },
      {
        path: "/yepa2024/admin/ratings",
        element: <>
          <Suspense fallback={<Loader />}>
            <DashboardRating />
          </Suspense>
        </>,
      },
      {
        path: "/yepa2024/admin",
        element: <Navigate to="/yepa2024/admin/settings" />,
      },
      {
        path: "/yepa2024/admin/dashboard/settings",
        element: <>
          <Suspense fallback={<Loader />}>
            <SettingsContainer />
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
