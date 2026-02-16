import Header from "../ui/home/header";
import NavBar from "../ui/home/nav-bar";
import Link from "next/link";

export default function TestPage() {
  return (
    <>
      {/* Header */}


      {/* NavBar */}


      <main className="mx-auto max-w-2xl p-4 mt-4 md:mt-12 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-text text-lg">
            This is a text. They will be filled if needed.
          </p>

          <Link
            href="/"
            className="inline-block text-sm font-medium text-primary hover:underline"
          >
            Go back to the home page
          </Link>
        </div>
      </main>
    </>
  );
}
