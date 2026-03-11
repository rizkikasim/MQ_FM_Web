import { memo } from "react";
import { ArrowLeft } from "lucide-react";

const PageHeader = memo(({ title, onBack, children }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div>
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/50 hover:text-white transition mb-2"
        >
          <ArrowLeft size={20} /> Back
        </button>
      )}
      <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
        {title}
      </h1>
    </div>
    {children && <div>{children}</div>}
  </div>
));

export default PageHeader;
