export default function Loader() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white space-x-2">
      <div className="w-4 h-4 bg-[#00b8f1] rounded-full animate-bounce"></div>
      <div className="w-4 h-4 bg-[#009ed1] rounded-full animate-bounce [animation-delay:200ms]"></div>
      <div className="w-4 h-4 bg-[#00b8f1] rounded-full animate-bounce [animation-delay:400ms]"></div>
    </div>
  );
}
