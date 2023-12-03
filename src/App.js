import Datatable from "./components/datatable/Datatable";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Datatable/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
