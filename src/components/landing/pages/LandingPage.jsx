import MainLayout from "../templates/MainLayout";
import HeroBanner from "../organisms/banner/HeroBanner";
import SectionAbout from "../organisms/about/SectionAbout";
import SectionEpisodes from "../organisms/episodes/SectionEpisodes";
import SectionEnjoyPodcast from "../organisms/enjoyPodcast/SectionEnjoyPodcast";
import SectionShowedLanding from "../organisms/showed/SectionShowedLanding";
import SectionBestPlaying from "../organisms/bestPlaying/SectionBestPlaying";
import SectionSliderLanding from "../organisms/slider/SectionSliderLanding";
import SectionHolderStack from "../organisms/holderStack/SectionHolderStack";
import SectionEndLanding from "../organisms/end/SectionEndLanding";

function HomePage() {
    return (
        <MainLayout>
            <HeroBanner />
            <SectionAbout />
            <SectionEpisodes />
            <SectionEnjoyPodcast />
            <div className="relative">
                <SectionShowedLanding />
            </div>
            <SectionBestPlaying />
            <SectionSliderLanding />
            <SectionHolderStack />
            <SectionEndLanding />
        </MainLayout>
    );
}

export default HomePage;
