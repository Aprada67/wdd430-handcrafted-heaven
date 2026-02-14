export default function LoadingProducts() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-8 animate-pulse">

      {/* Fake filter buttons */}
      <div className="flex gap-3 mb-10">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-9 w-20 rounded-full bg-gray-300"
          />
        ))}
      </div>

      {/* Fake section */}
      {Array.from({ length: 2 }).map((_, sectionIndex) => (
        <section key={sectionIndex} className="mb-14">

          {/* Fake title */}
          <div className="h-6 w-40 bg-gray-300 rounded mb-6" />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, cardIndex) => (
              <div
                key={cardIndex}
                className="bg-gray-200 rounded-2xl p-3 flex flex-col"
              >
                {/* image */}
                <div className="h-[180px] bg-gray-300 rounded-xl" />

                {/* title */}
                <div className="h-4 bg-gray-300 rounded mt-4 w-3/4" />

                {/* price */}
                <div className="h-4 bg-gray-300 rounded mt-2 w-1/3" />

                {/* buttons */}
                <div className="mt-auto pt-4 flex flex-col gap-2">
                  <div className="h-8 bg-gray-300 rounded-full" />
                  <div className="h-8 bg-gray-300 rounded-full" />
                </div>
              </div>
            ))}
          </div>

        </section>
      ))}
    </main>
  );
}
