// /src/core/responsive/mobile/BannerMobileResponsive.jsx
function BannerMobileResponsive({ selectedSlide }) {
  return (
    <div
      className={`absolute md:hidden rounded-full blur-[180px] opacity-70 transition-all duration-700 
      bg-gradient-to-br ${selectedSlide.gradient.glow}
      w-[60rem] h-[60rem] -top-40 -left-40`}
    />
  );
}

export default BannerMobileResponsive;
