import { LandingPage } from "@/components/landing-page";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/md-dark-indigo/theme.css";

export default function Home(): JSX.Element {
  return (
    <PrimeReactProvider>
      <LandingPage />
    </PrimeReactProvider>
  );
}
