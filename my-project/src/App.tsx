import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import HomeLayout from "./components/HomeLayout";
import LandingPage from "./components/LandingPage";
import LoginPage from "./pages/login/page";
import RegisterPage from "./pages/register/page";
import { ToastContainer } from "react-toastify";
import DashboardPage from "./pages/dashboard/page";
import TransactionsPage from "./pages/transactions/page";
import ReportsPage from "./pages/reports/page";
import GoalsPage from "./pages/goals/page";
import CardsPage from "./pages/cards/page";
import SettingsPage from "./pages/settings/page";
import { useSyncInfo } from "./hooks/useSyncInfo";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="transactions" element={<TransactionsPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="goals" element={<GoalsPage />} />
        <Route path="cards" element={<CardsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </>
  )
);

function App() {
  useSyncInfo();

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
