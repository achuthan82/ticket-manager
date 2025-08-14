// Local Imports
import Loader from "app/pages/components/Loader";
// ----------------------------------------------------------------------

export function SplashScreen() {
  return (
    <div className="fixed inset-0 bg-[var(--color-ecru-white)] flex items-center justify-center">
      <Loader size="xl" text="Loading Ticket Manager..." />
    </div>
  );
}
