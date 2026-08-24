import { SiteHeader } from "@/components/layout/site-header";
import { HomeHero } from "@/components/sections/home-hero";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HomeHero />
      </main>
    </>
  );
}
