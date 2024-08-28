import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Details from "./Pages/Details";
import Header from "./Components/Header";
import Leag from "./Pages/Leag";
import Table from "./Components/Table";
import Overview from "./Components/Overview";
import Matches from "./Components/Matches";
import Stats from "./Components/Stats";
import NotFound from './Pages/notFound';
import { QueryClientProvider } from "react-query";
import { queryClient } from "./core/api";
import Login from "./Pages/Login";
import ProtectedRoutes from "./utils/ProtectedRoutes";
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route path="/details" element={<Details />} />
            <Route path="/league/:id/:name" element={<Leag />}>
              <Route index element={<Overview />} />
              <Route path="overview" element={<Overview />} />
              <Route path="table" element={<Table />} />
              <Route path="matches" element={<Matches />} />
              <Route path="stats" element={<Stats />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}
export default App;
