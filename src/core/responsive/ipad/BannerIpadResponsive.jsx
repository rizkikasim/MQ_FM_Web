// /src/core/responsive/ipad/BannerIpadResponsive.jsx
function BannerIpadResponsive({ selectedSlide }) {
  return (
    <div
      className={`hidden md:block xl:hidden absolute rounded-full blur-[180px] opacity-70 transition-all duration-700 
      bg-gradient-to-br ${selectedSlide.gradient.glow}
      w-[65rem] h-[35rem] -top-64 -left-40`}
    />
  );
}

export default BannerIpadResponsive;
