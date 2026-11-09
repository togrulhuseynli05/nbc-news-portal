import Navbar from '../components/Navbar.jsx';
import HeroSection from '../components/HeroSection.jsx';
import BreakingNews from '../components/BreakingNews.jsx';
import LatestStories from '../components/LatestStories.jsx';
import SidePanel from '../components/SidePanel.jsx';
import EditorsPicks from '../components/EditorsPicks.jsx';
import Footer from '../components/Footer.jsx';


function HomePage() {
  return (
    <>
      <Navbar />

      <div className="container">
        <HeroSection />
      </div>

      <BreakingNews />

      <div className="content-grid">
        <LatestStories />
        <SidePanel />
      </div>

      <EditorsPicks />

      <Footer />
    </>
  );
}

export default HomePage;
