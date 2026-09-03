import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ExerciseLibrary from './pages/ExerciseLibrary';
import ExerciseDetail from './pages/ExerciseDetail';
import AthleteDashboard from './pages/AthleteDashboard';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-background text-on-background selection:bg-primary-container selection:text-on-primary-container">
        {/* Global Navigation (Sidebar on Desktop, Top Bar on Mobile) */}
        <Navbar />
        
        {/* Main Content Pane (indented on desktop for the fixed sidebar) */}
        <div className="flex-grow pl-0 md:pl-80 pt-16 md:pt-0 flex flex-col min-h-screen">
          <main className="flex-grow flex flex-col">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/exercises" element={<ExerciseLibrary />} />
              <Route path="/exercises/:id" element={<ExerciseDetail />} />
              <Route path="/dashboard" element={<AthleteDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
