import { LandingPage } from "@/components/landing-page";
import { PrimeReactProvider } from "primereact/api";

export default function Home(): JSX.Element {
  return (
    <PrimeReactProvider>
      <LandingPage />
    </PrimeReactProvider>
  );
}
