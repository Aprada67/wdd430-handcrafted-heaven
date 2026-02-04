import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <main className="mx-auto max-w-6xl px-6 py-8 mt-4 md:mt-12">
        <div className="grid gap-12 md:grid-cols-2">

          {/* LEFT COLUMN */}
          <div className="space-y-10">

            {/* About */}
            <section>
              <h1 className="text-3xl font-bold mb-4 text-text">
                About Handcrafted Heaven
              </h1>
              <p className="text-text">
                Handcrafted Heaven is a curated marketplace dedicated to
                celebrating artisans and their handmade creations. Every
                product tells a story.
              </p>
            </section>

            {/* Mission */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-text">
                Our Mission
              </h2>

              <p className="text-sm text-text max-w-md">
                We empower independent makers by giving them a platform to
                reach customers who value authenticity, craftsmanship, and
                sustainability.
              </p>

              {/* Mission image */}
              <div className="w-40 aspect-square rounded-lg overflow-hidden">
                <Image
                  src="/images/pot.png"
                  alt="Handcrafted pottery"
                  width={160}
                  height={160}
                  className="object-cover"
                />
              </div>
            </section>

          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-10">

            {/* What We Believe */}
            <section>
              <h2 className="text-xl font-semibold text-text">
                What We Believe
              </h2>
              <p className="text-sm text-text">
                Handmade products are more than items — they are expressions
                of culture, creativity, and care.
              </p>
            </section>

            {/* Values */}
            <section>
              <h2 className="text-xl font-semibold mb-4 text-text">
                Our Values
              </h2>
              <ul className="grid gap-4 text-sm">
                <li className="p-4 bg-secondary rounded-lg">
                  <strong>Authenticity</strong><br />
                  Real people. Real craftsmanship.
                </li>
                <li className="p-4 bg-secondary rounded-lg">
                  <strong>Community</strong><br />
                  Supporting artisans worldwide.
                </li>
                <li className="p-4 bg-secondary rounded-lg">
                  <strong>Sustainability</strong><br />
                  Thoughtful, ethical production.
                </li>
              </ul>
            </section>

          </div>
        </div>
      </main>
    </>
  );
}
