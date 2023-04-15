import { useEffect } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ControlBar from "../components/ControlBar";
import Sidebar from "../components/Sidebar";
import Spinner from "../components/Spinner";
import Orders from "../pages/Orders";
import Invoices from "../pages/Invoices";
import { getGoals, reset } from "../features/goals/goalSlice";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      // navigate('/login')
    }

    dispatch(getGoals());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  return (
    <>
      <div className="dashboard">
        <Sidebar />
        <div>
          <ControlBar />
          <Routes>
            <Route path="/" element={<Orders />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:filter" element={<Orders />} />
            <Route path="/orders/:sub/:filter" element={<Orders />} />
            <Route path="/invoices" element={<Invoices />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
