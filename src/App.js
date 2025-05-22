import './App.css';
import { Route, Routes, useLocation } from 'react-router';
import Home from './pages/Home';
import Error from './pages/Error';
import Navbar from './Navbar';
import DBDishes from './pages/DBDishes.jsx';
import DBDish from './pages/DBDish.jsx';
import Upload from './pages/Upload.jsx';
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
          <Route exact path="/dbdishes" element={<DBDishes/>} />
          <Route exact path="/dbdish/*" element={<DBDish/>} />
          <Route exact path="/upload" element={<Upload/>} />
          <Route component={Error} />
        </Routes>
    </main>
  );
}

export default App;
