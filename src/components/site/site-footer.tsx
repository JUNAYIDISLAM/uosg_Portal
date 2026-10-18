import Link from "next/link";
import { navLinks, siteInfo } from "@/content/site";
import { buttonClass } from "@/components/ui/button";
import { LogoMark } from "./logo";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "./social-icons";

const socials = [
  { label: "Facebook", href: siteInfo.social.facebook, Icon: FacebookIcon },
  { label: "Instagram", href: siteInfo.social.instagram, Icon: InstagramIcon },
  { label: "YouTube", href: siteInfo.social.youtube, Icon: YoutubeIcon },
];

export function SiteFooter() {
  return (
    <footer>
      <div className="bg-brand-600">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="font-heading text-xl font-bold text-white">
            Secure a better future through Scouting.
          </p>
          <Link href="/#contact" className={buttonClass("white", "sm")}>
            Support our mission
          </Link>
        </div>
      </div>

      <div className="bg-navy-800 text-white/75">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.2fr_1fr_0.8fr] lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-white p-1">
                <LogoMark size={36} />
              </span>
              <div>
                <p className="font-heading font-bold text-white">{siteInfo.name}</p>
                <p className="text-xs">{siteInfo.tagline}</p>
              </div>
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed">
              Affiliated with Bangladesh Scouts. Open to every young person ready to learn and
              serve.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">Quick links</h2>
            <ul className="mt-5 grid grid-flow-col grid-rows-4 gap-x-10 gap-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">Follow us</h2>
            <ul className="mt-5 space-y-2.5 text-sm">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a href={href} className="inline-flex items-center gap-2 hover:text-white">
                    <Icon className="size-4" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10">
          <p className="mx-auto max-w-7xl px-4 py-6 text-xs sm:px-6 lg:px-8">
            © 2026 {siteInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
