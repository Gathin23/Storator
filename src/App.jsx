import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Genre from "./pages/Genre/Genre";
import Fantasy from "./pages/Genre/Fantasy";
import Horror from "./pages/Genre/Horror";
import Romance from "./pages/Genre/Romance";

import Create from "./pages/Genre/Create"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genre" element={<Genre />} />
        <Route path="/genre/fantasy" element={<Fantasy />} />
        <Route path="/genre/horror" element={<Horror />} />
        <Route path="/genre/romance" element={<Romance />} />
        <Route path="/genre/fantasy/create" element={<Create />} />
        <Route path="/genre/horror/create" element={<Create />} />
        <Route path="/genre/Romance/create" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;