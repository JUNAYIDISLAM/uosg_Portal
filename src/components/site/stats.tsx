import { stats } from "@/content/site";

export function Stats() {
  return (
    <section aria-labelledby="stats-title" className="bg-white py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <h2 id="stats-title" className="font-serif text-3xl font-bold text-ink">
            Numbers that tell our story
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-body">
            Through collective effort and dedication, we continue to grow and make a difference.
          </p>
        </div>

        <div className="rounded-2xl bg-brand-600 p-8 text-white">
          <p className="font-serif text-6xl font-bold">{stats.headline.value}</p>
          <p className="mt-4 text-white/85">{stats.headline.label}</p>
        </div>

        <dl className="divide-y divide-line">
          {stats.items.map((item) => (
            <div key={item.label} className="flex items-end justify-between gap-4 py-4">
              <dt className="text-sm text-body">{item.label}</dt>
              <dd className="font-serif text-3xl font-bold text-ink">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
