import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { GithubContextProvider } from "./context/Githhub/GithubContext";

function App() {
  return (
    <GithubContextProvider>
      <Router>
        <div className="flex flex-col justify-between h-screen">
          <NavBar></NavBar>
          <main className="container mx-auto px-3 pb-12">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/notfound" element={<NotFound />}></Route>
              <Route path="/*" element={<NotFound />}></Route>
            </Routes>
          </main>
          <Footer></Footer>
        </div>
      </Router>
    </GithubContextProvider>
  );
}

export default App;
