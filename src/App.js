import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import New from "./pages/new/New";
import AddBook from './pages/editData/AddBook';
import ViewData from './pages/viewData/ViewData'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useContext, useState } from "react";

function App() {

  const [bookId, setBookId] = useState("");
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className="right-edit">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route index element={
            <RequireAuth>
            <Home />
            </RequireAuth>} />
            
            <Route path="edit/" element={
                <RequireAuth>
                  <AddBook id={bookId} setBookId={setBookId} />
                </RequireAuth>
              } />

            <Route path="new/" element={
                <RequireAuth>
                  <New id={bookId} setBookId={setBookId} />
                </RequireAuth>} />
            
               {/* <Route path="view/" >
                <Route path=":viewuser" element={
                  <RequireAuth>
                    <ViewData id={bookId} setBookId={setBookId} />
                  </RequireAuth>} />
                </Route> */}
            
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
