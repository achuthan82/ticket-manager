// Local Imports
// import Logo from "assets/appLogo.svg?react";
import { Progress } from "components/ui";

// ----------------------------------------------------------------------

export function SplashScreen() {
  return (
    <>
      <div className="fixed grid h-full w-full place-content-center">
        {/* <Logo className="size-28" /> */}
        <div className="w-full flex justify-center">
          <div className="bg-[#00B4D8] text-white  w-28 h-28 rounded-lg flex items-center justify-center font-bold text-6xl flex-shrink-0 cursor-pointer transition-colors duration-200">D</div>
        </div>
        <Progress
          color="primary"
          isIndeterminate
          animationDuration="1s"
          className="mt-2 h-1"
        />
      </div>
    </>
  );
}
