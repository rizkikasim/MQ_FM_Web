import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

// === Data Dummy “Dengarkan Lagi” ===
const listenAgainData = [
  {
    id: 1,
    title: "King (Official Video)",
    type: "Video",
    artist: "Years & Years",
    views: "334 jt",
    imageUrl:
      "https://i.scdn.co/image/ab67616d00001e02ff3e3a2f3e8396b6f951f28b",
    showPlayIcon: true,
    progressPercent: 40,
  },
  {
    id: 2,
    title: "Black Out Days (Stay Away)",
    type: "Lagu",
    artist: "Ian Asher & Phantogram",
    imageUrl:
      "https://i.scdn.co/image/ab67616d00001e02b0a709569733408a2f1c9c7f",
    showPlayIcon: true,
  },
  {
    id: 3,
    title: "Let It Be Me (feat. Ava Max)",
    type: "Lagu",
    artist: "David Guetta",
    imageUrl:
      "https://i.scdn.co/image/ab67616d00001e02eabc9616223b009e3a65f9f5",
  },
  {
    id: 4,
    title: "[Sukuna vs Mahoraga | (Malevolent Shrine)]",
    type: "Lagu",
    artist: "PHAROZEN",
    views: "12 jt",
    imageUrl:
      "https://i.scdn.co/image/ab67616d00001e02927233347613e55543c39d8e",
  },
  {
    id: 5,
    title: "I Forgive You",
    type: "Lagu",
    artist: "Sia",
    imageUrl:
      "https://i.scdn.co/image/ab67616d00001e027f5c5307d814c18f16b677f5",
    showPlayIcon: true,
  },
  {
    id: 6,
    title: "Another Love",
    type: "Lagu",
    artist: "Tom Odell",
    imageUrl:
      "https://i.scdn.co/image/ab67616d00001e02f855e372570d76067b7f2402",
  },
];

// === Komponen Card ===
const MusicCard = ({ item }) => {
  const navigate = useNavigate();
  const { imageUrl, title, type, artist, views, showPlayIcon, progressPercent } =
    item;

  const handleClick = () => {
    // ✅ arahkan ke halaman player screen lo
    navigate("/player", { state: { item } });
  };

  return (
    <div
      onClick={handleClick}
      className="flex-shrink-0 w-36 md:w-40 2xl:w-52 cursor-pointer"
    >
      <div className="relative group w-full aspect-square rounded-lg overflow-hidden mb-2">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {showPlayIcon && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <Play size={36} fill="white" className="text-white" />
          </div>
        )}
        {progressPercent && (
          <div className="absolute bottom-2 left-2 right-2 h-1 bg-white/40 rounded-full">
            <div
              className="h-full bg-white"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}
      </div>

      <h3 className="text-white text-sm font-semibold truncate">{title}</h3>
      <p className="text-gray-400 text-xs line-clamp-2">
        {type} • {artist} {views ? `• ${views} x ditonton` : ""}
      </p>
    </div>
  );
};

// === Komponen Utama ===
const ListeningAgainCard = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white cursor-pointer hover:underline">
          Dengarkan lagi
        </h2>
        <div className="flex items-center gap-2">
          <a
            href="#"
            className="text-sm font-bold text-gray-400 hover:text-white hover:underline"
          >
            Selengkapnya
          </a>
          <button
            onClick={() => scroll("left")}
            className="w-8 h-8 rounded-full bg-black/30 flex items-center justify-center hover:bg-black/60"
          >
            <ChevronLeft size={20} className="text-gray-300" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-8 h-8 rounded-full bg-black/30 flex items-center justify-center hover:bg-black/60"
          >
            <ChevronRight size={20} className="text-gray-300" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-4 scroll-smooth no-scrollbar"
      >
        {listenAgainData.map((item) => (
          <MusicCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ListeningAgainCard;
