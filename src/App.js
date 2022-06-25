import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./component/Navbar";
import Users from "./component/Users";
import CreateUser from "./component/CreateUser";
import UpdateUser from "./component/UpdateUser";

function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Users />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/update/:id" element={<UpdateUser />} />{" "}
          {/* <Route path="points" element={<Points/>}/>
            <Route path="NotFound" element={<NotFound/>} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
