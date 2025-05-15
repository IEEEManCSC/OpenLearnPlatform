import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//layouts
import MainLayout from "@layouts/MainLayout";

// Pages
import Login from "@pages/Login";

// Router Functions
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Roadmap from "../pages/Roadmap";
import LeaderBoard from "../pages/LeaderBoard";
import Quiz from "../pages/Quiz";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Help from "../pages/Help";
import ChooseTrack from "../pages/ChooseTrack";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: 'choose',
    element: <ChooseTrack />
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'roadmap',
        element: <Roadmap />
      },
      {
        path: 'leader',
        element: <LeaderBoard />
      },
      {
        path: 'quiz',
        element: <Quiz />
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'setting',
        element: <Settings />
      },
      {
        path: 'help',
        element: <Help />
      },

    ],
  },
]);

const queryClient = new QueryClient();
const AppRouter = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default AppRouter;
