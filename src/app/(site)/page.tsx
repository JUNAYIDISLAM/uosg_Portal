import { news } from "@/content/site";
import { About } from "@/components/site/about";
import { Activities } from "@/components/site/activities";
import { Contact } from "@/components/site/contact";
import { CoreValues } from "@/components/site/core-values";
import { Gallery } from "@/components/site/gallery";
import { GetInvolved } from "@/components/site/get-involved";
import { Hero } from "@/components/site/hero";
import { Leadership } from "@/components/site/leadership";
import { News } from "@/components/site/news";
import { Stats } from "@/components/site/stats";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CoreValues />
      <About />
      <Leadership />
      <Activities />
      <Stats />
      <GetInvolved />
      <News items={news} />
      <Gallery />
      <Contact />
    </>
  );
}
