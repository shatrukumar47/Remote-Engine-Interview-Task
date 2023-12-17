import MainRoute from './AllRoutes/MainRoute';
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div style={{minHeight:"90vh"}}>
        <MainRoute />
      </div>
      <Footer />
    </div>
  );
}

export default App;
