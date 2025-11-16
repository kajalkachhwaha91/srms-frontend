export const Button = ({ children, className = "", ...props }) => (
  <button
    {...props}
    className={`px-3 py-1.5 rounded-md bg-sky-500 text-white hover:bg-sky-600 transition ${className}`}
  >
    {children}
  </button>
);
