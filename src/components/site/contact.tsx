import { ContactForm } from "./contact-form";
import { WhyJoin } from "./why-join";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="bg-white pt-16 pb-20 lg:pt-20 lg:pb-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="contact-title"
          className="font-heading text-3xl font-extrabold text-navy-800 uppercase sm:text-4xl"
        >
          Why <br />
          United Open Scout Group?
        </h2>

        {/* Both columns open with an intro line, so the two lines sit side by side */}
        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="leading-relaxed text-body">
              A place where young people grow into confident, caring leaders. Here is what makes our
              group different.
            </p>
            <div className="mt-8">
              <WhyJoin />
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
