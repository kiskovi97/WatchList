import './App.css';
import { Route, Routes, useLocation } from 'react-router';
import Home from './pages/Home';
import Error from './pages/Error';
import Navbar from './Navbar';
import AllShows from './pages/AllShows.jsx';
import Show from './pages/Show.jsx';
import ReactGa from 'react-ga';
import { useEffect } from 'react';
import { useAuth } from "./AuthContext";
import Login from './pages/Login.jsx';

function usePageViews() {
    let location = useLocation();
    useEffect(()=> {
      if (!window.GA_INITIALIZED) {
        ReactGa.initialize('UA-166027980-1');
        window.GA_INITIALIZED = true;
      }
      ReactGa.set({ page: location.pathname});
      ReactGa.pageview(location.pathname + location.search);
    }, [location])
}

function App() {

  const { user, loading } = useAuth();

  usePageViews();

  if (loading) return <main className="App"><p>Loading...</p></main>;
  if (!user)
  {
    return (
      <main className="App">
        <Login />
      </main>
    );
  }

  return (
    <main className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home/>}  />
          <Route exact path="/all" element={<AllShows/>} />
          <Route exact path="/show/*" element={<Show/>} />
          <Route component={Error} />
        </Routes>
    </main>
  );
}

export default App;
