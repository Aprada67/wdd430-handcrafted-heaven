export default function HomeLoading() {
  return (
    <main className="animate-pulse">

      {/* ===== Hero skeleton ===== */}
      <section className="w-full h-[320px] bg-gray-300" />

      {/* ===== Intro text skeleton ===== */}
      <section className="px-6 py-6">
        <div className="max-w-3xl space-y-3">
          <div className="h-4 bg-gray-300 rounded w-full" />
          <div className="h-4 bg-gray-300 rounded w-11/12" />
          <div className="h-4 bg-gray-300 rounded w-10/12" />
        </div>
      </section>

      {/* ===== Popular products skeleton ===== */}
      <section className="px-6 py-10 max-w-7xl mx-auto">

        {/* title */}
        <div className="h-6 w-48 bg-gray-300 rounded mb-6" />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 rounded-2xl p-3 flex flex-col"
            >
              {/* image */}
              <div className="h-[180px] bg-gray-300 rounded-xl" />

              {/* name */}
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
    </main>
  );
}
