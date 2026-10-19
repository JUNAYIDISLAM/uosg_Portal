import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { siteInfo } from "@/content/site";
import { ContactForm } from "./contact-form";

const details = [
  { Icon: MapPin, text: siteInfo.address },
  { Icon: Phone, text: siteInfo.phone, href: `tel:${siteInfo.phone.replace(/[^+\d]/g, "")}` },
  { Icon: Mail, text: siteInfo.email, href: `mailto:${siteInfo.email}` },
  { Icon: Clock, text: siteInfo.meeting },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-white py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h2
            id="contact-title"
            className="font-heading text-3xl font-extrabold text-navy-800 uppercase sm:text-4xl"
          >
            Come and say hello
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-body">
            Interested in joining, partnering or inviting us to an event? Drop us a message.
          </p>
          <ul className="mt-8 space-y-4">
            {details.map(({ Icon, text, href }) => (
              <li key={text} className="flex items-start gap-3 text-ink">
                <Icon className="mt-0.5 size-5 shrink-0 text-brand-600" aria-hidden="true" />
                {href ? (
                  <a href={href} className="hover:text-brand-700">
                    {text}
                  </a>
                ) : (
                  <span>{text}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
