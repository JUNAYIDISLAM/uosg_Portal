import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { navLinks, siteInfo } from "@/content/site";
import { buttonClass } from "@/components/ui/button";
import { LogoMark } from "./logo";
import { FacebookIcon, InstagramIcon, LinkedinIcon, XIcon, YoutubeIcon } from "./social-icons";

const socials = [
  { label: "Facebook", href: siteInfo.social.facebook, Icon: FacebookIcon },
  { label: "Instagram", href: siteInfo.social.instagram, Icon: InstagramIcon },
  { label: "YouTube", href: siteInfo.social.youtube, Icon: YoutubeIcon },
  { label: "LinkedIn", href: siteInfo.social.linkedin, Icon: LinkedinIcon },
  { label: "X (Twitter)", href: siteInfo.social.twitter, Icon: XIcon },
];

const details = [
  { Icon: MapPin, text: siteInfo.address },
  { Icon: Phone, text: siteInfo.phone, href: `tel:${siteInfo.phone.replace(/[^+\d]/g, "")}` },
  { Icon: Mail, text: siteInfo.email, href: `mailto:${siteInfo.email}` },
  { Icon: Clock, text: siteInfo.meeting },
];

export function SiteFooter() {
  return (
    <footer>
      {/* Call-to-action band, hidden for now; remove `hidden` to show it again */}
      <div className="hidden bg-brand-600">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="font-heading text-xl font-bold text-white">
            Secure a better future through Scouting.
          </p>
          <Link href="/#contact" className={buttonClass("white", "sm")}>
            Support our mission
            <ArrowRight className="size-4" strokeWidth={2.5} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="bg-navy-800 text-white/75">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.3fr_1fr_1.4fr] lg:gap-16 lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-white p-1">
                <LogoMark size={40} />
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

            <ul className="mt-6 flex gap-3">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-600"
                  >
                    <Icon className="size-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-sm font-semibold tracking-wider text-white uppercase">
              Quick links
            </h2>
            <ul className="mt-5 grid grid-flow-col grid-rows-4 gap-x-10 gap-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <h2 className="font-heading text-sm font-semibold tracking-wider text-white uppercase">
              Get in touch
            </h2>
            <ul className="mt-5 space-y-3.5 text-sm">
              {details.map(({ Icon, text, href }) => (
                <li key={text} className="flex items-start gap-3">
                  <Icon className="mt-0.5 size-4 shrink-0 text-brand-100" aria-hidden="true" />
                  {href ? (
                    <a href={href} className="transition-colors hover:text-white">
                      {text}
                    </a>
                  ) : (
                    <span>{text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10">
          <p className="mx-auto max-w-7xl px-4 py-6 text-center text-xs sm:px-6 lg:px-8">
            © 2026 {siteInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
