// /src/core/responsive/mac/BannerMacResponsive.jsx
function BannerMacResponsive({ selectedSlide }) {
  return (
    <div
      className={`hidden xl:block absolute rounded-full blur-[180px] opacity-70 transition-all duration-700 
      bg-gradient-to-br ${selectedSlide.gradient.glow}
      w-[70rem] h-[60rem] -top-40 -left-40`}
    />
  );
}

export default BannerMacResponsive;
