
const ComingSoon = () => {
  return (
 <div className="min-h-screen bg-[#2A5A9D1A] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full text-center p-10 space-y-6 border border-[#2A5A9D33]">
        {/* Icon/logo placeholder */}
        <div className="w-14 h-14 mx-auto bg-[#2A5A9D]/90 rounded-full flex items-center justify-center text-white text-xl font-semibold">
          🚧
        </div>

        <h1 className="text-3xl font-bold text-[#2A5A9D]">Coming Soon</h1>
        <p className="text-gray-600">
          We &apos;re working on something awesome. Stay tuned!
        </p>

        {/* <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} YourCompany
        </p> */}
      </div>
    </div>
  );
};

export default ComingSoon;
