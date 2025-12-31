import { create } from "zustand";
import { ItemLandingBanner } from "../../../data/item/ItemLandingBanner";

export const useBannerLandingStore = create((set, get) => ({
  scrollRef: null,
  audioRef: null,
  slides: ItemLandingBanner,
  selectedSlide: ItemLandingBanner[0],
  activeIndex: 0,
  isVolumeOn: true,
  progress: 0,
  isPlaying: false,
  duration: 0,
  currentTime: 0,

  setRefs: (refs) => set(refs),

  initFirstAudio: () => {
    const { selectedSlide, audioRef, updateProgress, handleEnded } = get();
    let audio = audioRef;

    if (!audio) {
      audio = new Audio();
      set({ audioRef: audio });
    }

    // siapkan audio tanpa autoplay
    audio.src = selectedSlide.audio;
    audio.currentTime = 0;
    audio.volume = get().isVolumeOn ? 1 : 0;

    // binding listener biar progress & durasi langsung kebaca
    audio.removeEventListener("timeupdate", updateProgress);
    audio.removeEventListener("ended", handleEnded);
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);

    // update durasi kalau sudah siap
    audio.addEventListener("loadedmetadata", () => {
      set({
        duration: audio.duration || 0,
        progress: 0,
        currentTime: 0,
        isPlaying: false,
      });
    });

    set({
      isPlaying: false,
      progress: 0,
      currentTime: 0,
      duration: 0,
    });
  },

  formatTime: (time) => {
    if (isNaN(time)) return "0:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  },

  updateProgress: () => {
    const audio = get().audioRef;
    if (audio && audio.duration > 0) {
      set({
        progress: (audio.currentTime / audio.duration) * 100,
        duration: audio.duration,
        currentTime: audio.currentTime,
      });
    }
  },

  handleEnded: () => set({ isPlaying: false, progress: 0, currentTime: 0 }),

  scroll: (dir) => {
    const scroll = get().scrollRef;
    if (!scroll) return;
    const amount = 320;
    const { scrollLeft } = scroll;
    scroll.scrollTo({
      left: dir === "left" ? scrollLeft - amount : scrollLeft + amount,
      behavior: "smooth",
    });
  },

  playSlide: async (slide, index) => {
    const { isVolumeOn, updateProgress, handleEnded, audioRef } = get();

    let audio = audioRef;
    if (!audio) {
      audio = new Audio();
      set({ audioRef: audio });
    }

    // stop audio lama
    audio.pause();
    audio.src = slide.audio;
    audio.currentTime = 0;
    audio.volume = isVolumeOn ? 1 : 0;

    // reset listener
    audio.removeEventListener("timeupdate", updateProgress);
    audio.removeEventListener("ended", handleEnded);

    // listener baru
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);

    try {
      audio.muted = true;
      await audio.play();
      audio.muted = !isVolumeOn ? true : false;

      set({
        selectedSlide: slide,
        activeIndex: index,
        isPlaying: true,
        progress: 0,
        currentTime: 0,
        duration: audio.duration || 0,
      });
    } catch {
      set({
        selectedSlide: slide,
        activeIndex: index,
        isPlaying: false,
      });
      console.warn("Autoplay blocked by browser — waiting for user gesture.");
    }
  },

  // hanya ganti lagu, ga bisa play/pause
  handleSelect: (index) => {
    const { slides, activeIndex, playSlide } = get();
    if (activeIndex === index) return;
    const selected = slides[index];
    playSlide(selected, index);
  },

  toggleVolume: () => {
    const { isVolumeOn, audioRef } = get();
    const newVal = !isVolumeOn;
    if (audioRef) audioRef.volume = newVal ? 1 : 0;
    set({ isVolumeOn: newVal });
  },

  handleSeek: (value) => {
    const { audioRef, duration } = get();
    const newVal = Number(value);
    if (audioRef && duration > 0) {
      audioRef.currentTime = (newVal / 100) * duration;
    }
    set({ progress: newVal });
  },

  // toggle play/pause global dari TrackPlayer
  togglePlayPause: () => {
    const { audioRef, isPlaying } = get();
    if (!audioRef) return;

    if (isPlaying) {
      audioRef.pause();
      set({ isPlaying: false });
    } else {
      audioRef.play();
      set({ isPlaying: true });
    }
  },
}));
