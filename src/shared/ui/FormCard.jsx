import { memo } from "react";

const FormCard = memo(({ children, className = "" }) => (
  <div className={`bg-white/5 p-8 md:p-10 rounded-3xl border border-white/10 backdrop-blur-xl ${className}`}>
    {children}
  </div>
));

export default FormCard;
