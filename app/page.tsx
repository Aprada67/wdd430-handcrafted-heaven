import Hero from "./ui/home/hero";
import Popular from "./ui/home/popular";

export default function HomePage() {
  return (
    <>
      { /* Hero Image */}
      <Hero />

      { /* Intro text */}
      <section className="px-6 py-6">
        <p className="max-w-3xl text-sm text-text">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry standard dummy text
          ever since the 1500s, when an unknown printer took a galley of type
          and scrambled it to make a type specimen book.
        </p>
      </section>

      { /* Popular Products */}
     <Popular />
    </>
  )
}
