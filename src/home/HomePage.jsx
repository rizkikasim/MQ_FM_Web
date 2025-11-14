import NavbarHeader from "../components/navbar/NavbarHeader";
import BannerLanding from "../components/banner/BannerLanding";
import About from "../components/aboutSection/About";
import Episodes from "../components/episode/EpisodeLanding";
import EnjoyPodcast from "../components/enjoyPodcast/EnjoyPodcast";
import Footer from "../core/shared/footer/Footer";
import ShowedLanding from "../components/showed/ShowedLanding";
import BestPlaying from "../components/best/BestPlaying";
import SliderLanding from "../components/slider/SliderLanding";
import HolderStack from "../components/holder/HolderStack";
import EndLanding from "../components/endSectionLanding/EndLanding";

function HomePage() {
  return (
    <div className="relative w-full text-white font-sans">
      <NavbarHeader />
      <BannerLanding />
      <About />
      <Episodes />
      <EnjoyPodcast />
      <div className="relative">
        <ShowedLanding />
      </div>
      <BestPlaying />
      <SliderLanding />
      <HolderStack />
      <EndLanding />
      <Footer />
    </div>
  );
}

export default HomePage;
