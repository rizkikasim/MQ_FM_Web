// \wsl.localhost\Ubuntu-22.04\home\lif\Projects\mqfe\mqfm-web\src\core\shared\player\playerScreen.jsx

import React from 'react';

// --- (1) ICON COMPONENTS (Inline SVG) ---
// Menambahkan ikon baru untuk layout lengkap

const HamburgerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);

const CastIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 3.666C13.88 3.666 7.962 9.584 7.962 16.703m0 0a2.332 2.332 0 1 0 4.664 0 2.332 2.332 0 0 0-4.664 0Zm10.705-2.332a2.332 2.332 0 1 1-4.664 0 2.332 2.332 0 0 1 4.664 0Zm-3.5 13.03a.75.75 0 0 0-1.06 0l-3.5 3.5a.75.75 0 0 0 1.06 1.06l3.5-3.5a.75.75 0 0 0 0-1.06Zm-7 0a.75.75 0 0 0-1.06 0l-3.5 3.5a.75.75 0 0 0 1.06 1.06l3.5-3.5a.75.75 0 0 0 0-1.06ZM3 3.666C3 9.584 8.918 15.503 16.038 15.503" />
  </svg>
);

const HomeIcon = ({ active }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
    <path d="M11.47 3.84a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.06l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 0 0 1.061 1.06l8.69-8.69Z" />
    <path d="M12 5.432 4.686 12.747a.75.75 0 0 1-1.06-1.061l7.314-7.314a.75.75 0 0 1 1.06 0l7.314 7.314a.75.75 0 0 1-1.06 1.06L12 5.432Z" />
    <path d="M4.5 12.75a.75.75 0 0 0-1.5 0v8.25a.75.75 0 0 0 .75.75h4.5a.75.75 0 0 0 .75-.75v-4.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 0 .75.75h4.5a.75.75 0 0 0 .75-.75v-8.25a.75.75 0 0 0-1.5 0v7.5a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75v-4.5a2.25 2.25 0 0 0-2.25-2.25h-1.5a2.25 2.25 0 0 0-2.25 2.25v4.5a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75v-7.5Z" />
  </svg>
);

const ExploreIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

const LibraryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
  </svg>
);

const UpgradeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

const PlusIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const SpeakerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
    <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.348 2.595.342 1.24 1.519 1.905 2.66 1.905H6.44l4.5 4.5c.944.945 2.56.276 2.56-1.06V4.06ZM18.584 12c0-1.857-.87-3.58-2.298-4.702a.75.75 0 0 0-1.12.922 6.003 6.003 0 0 1 0 7.56c.32.418.9.5 1.12.922A8.203 8.203 0 0 0 18.584 12Z" />
  </svg>
);

const KebabIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
  </svg>
);

// --- (2) DUMMY DATA ---

const userPlaylists = [
  { id: 1, name: 'Musik yang Disukai', type: 'Playlist otomatis' },
  { id: 2, name: 'Gg', type: 'arthaloka radenningrat' },
  { id: 3, name: 'Suara dari Shorts', type: 'arthaloka radenningrat' },
  { id: 4, name: 'Mix Saya 1', type: 'Playlist' },
  { id: 5, name: 'Lagu Santai', type: 'Playlist' },
  { id: 6, name: 'Folk Indonesia', type: 'Playlist' },
];

const queue = [
  { id: 1, title: 'Chamber Of Reflection', artist: 'Mac DeMarco', duration: '3.52', art: 'https://i.scdn.co/image/ab67616d0000b2734e43addb596f25c1103a0889' },
  { id: 2, title: 'Somewhere Only We Know', artist: 'Gustixa dan Rhianne', duration: '3.05', art: null, active: true },
  { id: 3, title: 'Loves Song for You', artist: 'Me and My Sandcastle', duration: '3.03', art: 'https://i.scdn.co/image/ab67616d0000b273a9f0f6285e6a9f4c39c5b2f2' },
  { id: 4, title: 'Kxllswxtch- waste (EXTENDE...', artist: 'Arnetan', duration: '3.41', art: 'https://i.scdn.co/image/ab67616d0000b2735d4edce8d5d85c8e3175c026' },
  { id: 5, title: 'Chamber Of Reflection', artist: 'Mac DeMarco', duration: '3.52', art: 'https://i.scdn.co/image/ab67616d0000b2734e43addb596f25c1103a0889' },
  { id: 6, title: 'Somewhere Only We Know', artist: 'Gustixa dan Rhianne', duration: '3.05', art: null, active: false }, // Duplikat untuk scrolling
];


// --- (3) SUB-COMPONENTS ---

const Header = () => (
  <div className="h-16 flex-shrink-0 flex items-center justify-between px-6 bg-black border-b border-gray-900">
    {/* Left */}
    <div className="flex items-center space-x-4">
      <button className="text-gray-400 hover:text-white">
        <HamburgerIcon />
      </button>
      <div className="flex items-center space-x-2">
         {/* Anda bisa ganti dengan logo Music Anda */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white"><path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12 18a.75.75 0 0 1-.75-.75V7.59l-4.22 1.054a.75.75 0 1 1-.298-1.476l4.908-1.227a.75.75 0 0 1 .96.722V17.25a.75.75 0 0 1-.75.75Z" /></svg>
        <span className="text-white text-xl font-bold tracking-wider">Music</span>
      </div>
    </div>
    
    {/* Middle (Search) */}
    <div className="flex-1 max-w-xl">
      <div className="flex items-center bg-gray-800 rounded-full px-4 py-2.5">
        <SearchIcon />
        <input 
          type="text" 
          placeholder="Telusuri lagu, album, artis, podcast"
          className="bg-transparent w-full ml-3 text-white placeholder-gray-400 outline-none border-none text-sm"
        />
      </div>
    </div>
    
    {/* Right */}
    <div className="flex items-center space-x-4">
      <button className="text-gray-400 hover:text-white">
        <CastIcon />
      </button>
      {/* Placeholder untuk Avatar Pengguna */}
      <div className="w-8 h-8 bg-gray-700 rounded-full"></div> 
    </div>
  </div>
);

const LeftSidebar = () => (
  <nav className="w-60 flex-shrink-0 bg-black border-r border-gray-900 flex flex-col p-4 space-y-2">
    {/* Main Nav */}
    <div className="space-y-1">
      <a href="#" className="flex items-center space-x-4 px-3 py-2.5 rounded-md bg-gray-800 text-white font-semibold">
        <HomeIcon active={true} />
        <span>Beranda</span>
      </a>
      <a href="#" className="flex items-center space-x-4 px-3 py-2.5 rounded-md text-gray-400 hover:text-white font-semibold">
        <ExploreIcon />
        <span>Eksplorasi</span>
      </a>
      <a href="#" className="flex items-center space-x-4 px-3 py-2.5 rounded-md text-gray-400 hover:text-white font-semibold">
        <LibraryIcon />
        <span>Koleksi</span>
      </a>
      <a href="#" className="flex items-center space-x-4 px-3 py-2.5 rounded-md text-gray-400 hover:text-white font-semibold">
        <UpgradeIcon />
        <span>Upgrade</span>
      </a>
    </div>

    {/* Playlist Button */}
    <div className="pt-4">
      <button className="w-full flex items-center justify-center space-x-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-full">
        <PlusIcon className="w-5 h-5" />
        <span>Playlist</span>
      </button>
    </div>

    <div className="h-px bg-gray-800 my-4"></div>

    {/* User Playlists (Scrollable) */}
    <div className="flex-1 overflow-y-auto space-y-3 pr-2">
      {userPlaylists.map(item => (
        <a href="#" key={item.id} className="block group">
          <p className="text-white truncate font-medium group-hover:text-white">{item.name}</p>
          <p className="text-gray-400 text-sm truncate">{item.type}</p>
        </a>
      ))}
    </div>
  </nav>
);

const RightSidebar = () => (
  <aside className="w-96 flex-shrink-0 bg-black border-l border-gray-900 flex flex-col">
    {/* Konten dari UI sebelumnya, disesuaikan sedikit */}
    <div className="p-6 flex flex-col h-full">
      {/* Tabs */}
      <div className="flex-shrink-0 flex space-x-8 border-b border-gray-700">
        <button className="text-sm text-white font-bold tracking-wider relative top-px border-b-2 border-white pb-3">
          BERIKUTNYA
        </button>
        <button className="text-sm text-gray-400 font-bold tracking-wider pb-3 hover:text-white">
          LIRIK
        </button>
        <button className="text-sm text-gray-400 font-bold tracking-wider pb-3 hover:text-white">
          TERKAIT
        </button>
      </div>

      {/* Info dan Kontrol */}
      <div className="flex-shrink-0 flex justify-between items-center my-6">
        <div>
          <p className="text-xs text-gray-400">Diputar dari</p>
          <p className="text-white font-semibold">Radio Chamber Of Reflection</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-white text-black px-4 py-2 rounded-full flex items-center space-x-2 font-semibold text-sm hover:scale-105 transition-transform">
            <PlusIcon />
            <span>Simpan</span>
          </button>
          <button className="text-gray-400 hover:text-white">
            <KebabIcon />
          </button>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex-shrink-0 flex space-x-3 my-2">
        <button className="bg-white text-black text-xs font-medium px-3 py-1.5 rounded-full">
          All
        </button>
        <button className="bg-gray-800 text-white text-xs font-medium px-3 py-1.5 rounded-full hover:bg-gray-700">
          Populer
        </button>
        <button className="bg-gray-800 text-white text-xs font-medium px-3 py-1.5 rounded-full hover:bg-gray-700">
          Temukan
        </button>
        <button className="bg-gray-800 text-white text-xs font-medium px-3 py-1.5 rounded-full hover:bg-gray-700">
          Musik Popu...
        </button>
      </div>
      
      <div className="flex-shrink-0 w-full h-px bg-gray-700 my-4"></div>

      {/* Daftar Lagu (Scrollable) */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-2">
        {queue.map(song => (
          <SongItem key={song.id} song={song} />
        ))}
      </div>
    </div>
  </aside>
);

const SongItem = ({ song }) => (
  // Item untuk RightSidebar
  <div className={`flex items-center p-2 rounded-md hover:bg-gray-800 cursor-pointer ${song.active ? 'bg-gray-800' : ''}`}>
    {song.active ? (
      <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center mr-3">
        <SpeakerIcon />
      </div>
    ) : (
      <img 
        src={song.art} 
        alt={song.title} 
        className="w-10 h-10 rounded-sm object-cover mr-3 flex-shrink-0" 
      />
    )}
    <div className="flex-1 min-w-0">
      <p className={`font-semibold truncate ${song.active ? 'text-white' : 'text-white'}`}>
        {song.title}
      </p>
      <p className="text-sm text-gray-400 truncate">{song.artist}</p>
    </div>
    <p className="text-sm text-gray-400 ml-4">{song.duration}</p>
  </div>
);

const MainContent = () => (
  <main className="flex-1 overflow-y-auto p-8">
    {/* Ini adalah area konten utama, yang di gambar Anda berisi art besar */}
    <div className="max-w-4xl mx-auto">
      <img
        // Placeholder untuk gambar senja/awan
        src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop"
        alt="Main Content Art"
        className="w-full aspect-[4/3] object-cover rounded-lg shadow-lg"
      />
    </div>
    {/* Konten lain bisa ditambahkan di sini */}
  </main>
);

const FooterPlayer = () => (
  <footer className="h-20 flex-shrink-0 bg-black border-t border-gray-900 flex items-center justify-between px-6">
    {/* Kiri: Info Lagu */}
    <div className="flex items-center space-x-3">
       {/* Placeholder thumbnail */}
      <div className="w-12 h-12 bg-gray-700 rounded"></div> 
      <div>
        <p className="text-white font-medium text-sm">Suara dari Shorts</p>
        <p className="text-gray-400 text-xs">arthaloka radenningrat</p>
      </div>
    </div>

    {/* Tengah: Kontrol Player (Placeholder) */}
    <div className="flex flex-col items-center">
      <div className="flex items-center space-x-4">
        {/* Ikon Prev, Play, Next */}
        <p className="text-gray-400 text-sm">(Kontrol Player)</p>
      </div>
      {/* Seekbar */}
      <div className="w-64 h-1 bg-gray-700 rounded-full mt-2"></div>
    </div>
    
    {/* Kanan: Kontrol Volume, dll (Placeholder) */}
    <div>
      <p className="text-gray-400 text-sm">(Kontrol Volume)</p>
    </div>
  </footer>
);


// --- (4) MAIN COMPONENT (Merakit Semua Bagian) ---

const PlayerScreen = () => {
  return (
    // Container utama setinggi layar
    <div className="h-screen w-screen flex flex-col bg-black text-white font-sans">
      
      {/* Header (Statis di atas) */}
      <Header />
      
      {/* Konten Utama (Layout 3 kolom) */}
      <div className="flex flex-1 overflow-hidden"> {/* Penting: overflow-hidden di sini */}
        
        {/* Sidebar Kiri (Scrollable) */}
        <LeftSidebar />
        
        {/* Konten Tengah (Scrollable) */}
        <MainContent />
        
        {/* Sidebar Kanan (Scrollable) */}
        <RightSidebar />
        
      </div>
      
      {/* Footer Player (Statis di bawah) */}
      <FooterPlayer />
      
    </div>
  );
};

export default PlayerScreen;