import { useEffect, useRef } from "react";
import { IconsConstant } from "../../../../constant/IconsConstant";
import BannerMacResponsive from "../../../../core/responsive/mac/BannerMacResponsive";
import BannerMobileResponsive from "../../../../core/responsive/mobile/BannerMobileResponsive";
import BannerIpadResponsive from "../../../../core/responsive/ipad/BannerIpadResponsive";
import { useBannerLandingStore } from "../../../../core/logic/landing/useBannerLandingStore";
import TrackPlayer from "../../../../core/shared/trackPlayer/TrackPlayer";

export default function HeroBanner() {
    const {
        slides,
        selectedSlide,
        activeIndex,
        isVolumeOn,
        progress,
        scroll,
        toggleVolume,
        handleSelect,
        handleSeek,
        setRefs,
        initFirstAudio,
    } = useBannerLandingStore();

    const scrollRef = useRef(null);
    const audioRef = useRef(null);

    useEffect(() => {
        setRefs({ scrollRef: scrollRef.current, audioRef: audioRef.current });
        initFirstAudio();
    }, [setRefs, initFirstAudio]);

    return (
        <div className="relative min-h-screen w-full flex items-end justify-end overflow-hidden text-white p-8 sm:p-12 md:p-16 transition-all duration-700">
            {/* Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <BannerMobileResponsive selectedSlide={selectedSlide} />
                <BannerIpadResponsive selectedSlide={selectedSlide} />
                <BannerMacResponsive selectedSlide={selectedSlide} />
            </div>

            {/* Big Card */}
            <div
                className="absolute z-10 top-8 sm:top-12 md:top-16 left-8 sm:left-12 md:left-16 
        w-2/3 h-3/4 md:w-3/5 lg:w-1/2 xl:w-3/5 xl:h-5/6 
        rounded-3xl shadow-lg overflow-hidden flex items-end justify-start p-6 
        backdrop-blur-sm"
                style={{
                    backgroundImage: `url(${selectedSlide.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Volume Button */}
                <button
                    onClick={toggleVolume}
                    className="absolute top-6 right-6 z-20 w-10 h-10 flex items-center justify-center 
                     bg-white/10 hover:bg-white/20 rounded-full 
                     transition-transform hover:scale-105"
                >
                    <img
                        src={isVolumeOn ? IconsConstant.volumeOn : IconsConstant.volumeOff}
                        alt="Volume"
                        className="w-5 h-5"
                    />
                </button>

                {/* Track Player */}
                <TrackPlayer progress={progress} handleSeek={handleSeek} />
            </div>

            {/* Right Content */}
            <div className="relative z-10 text-left space-y-6 max-w-md xl:max-w-xl">
                {/* Navigation Buttons */}
                <div className="flex gap-3 mb-2">
                    <button
                        onClick={() => scroll("left")}
                        className="w-10 h-10 flex items-center justify-center bg-white/10 
              hover:bg-white/20 rounded-full transition-transform hover:scale-105"
                    >
                        <img src={IconsConstant.arrowLeft} alt="Left" className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="w-10 h-10 flex items-center justify-center bg-white/10 
              hover:bg-white/20 rounded-full transition-transform hover:scale-105"
                    >
                        <img src={IconsConstant.arrowRight} alt="Right" className="w-5 h-5" />
                    </button>
                </div>

                {/* Title and Subtitle */}
                <div className="space-y-2">
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        {selectedSlide.title}
                    </h1>
                    <p className="text-base text-gray-300 max-w-sm leading-relaxed">
                        {selectedSlide.subtitle}
                    </p>
                </div>

                {/* Thumbnails */}
                <div className="relative pt-4">
                    <div
                        ref={scrollRef}
                        className="flex overflow-x-auto no-scrollbar gap-4 scroll-smooth"
                    >
                        {slides.map((slide, i) => (
                            <div
                                key={i}
                                onClick={() => handleSelect(i)}
                                className="relative w-32 h-32 md:w-36 md:h-36 rounded-xl shadow-lg 
                flex-shrink-0 cursor-pointer overflow-hidden transition-all duration-500"
                            >
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="w-full h-full object-cover rounded-xl"
                                />
                                <div
                                    className={`absolute inset-0 rounded-xl transition-all duration-500 ${activeIndex === i
                                        ? "opacity-100 bg-white/10 backdrop-blur-md ring-1 ring-white/30"
                                        : "opacity-0 hover:opacity-100 bg-white/10 backdrop-blur-sm ring-1 ring-white/20"
                                        }`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
