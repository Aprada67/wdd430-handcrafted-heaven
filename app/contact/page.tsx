import ContactForm from "../ui/contact/contact-form";
import Header from "../ui/home/header";
import NavBar from "../ui/home/nav-bar";

export default function Page() {
  return (
    <>

      <main className="mx-auto max-w-2xl p-4 mt-4 md:mt-12">
        {/* Title */}
        <h1 className="mb-2 text-2xl font-semibold text-text md:text-3xl text-center">
          Contact Us
        </h1>

        {/* Description */}
        <p className="mb-6 text-sm text-text text-center">
          Have a question or want to get in touch?<br />
          Fill out the form below and we’ll get back to you as soon as possible.
        </p>

        {/* Info */}
        <div className="mb-8 flex flex-col gap-4 text-center text-sm text-primary-text-color">
          <p>
            <strong>Email:</strong> support@team-06.com
          </p>
          <p>
            <strong>Phone:</strong> +1 123 456 7890
          </p>
          <p>
            <strong>Address:</strong> 123 Main Street, Somewhere.
          </p>
        </div>

        {/* Form */}
        <ContactForm />

        {/* Footer note */}
        <p className="mt-8 text-center text-xs text-primary-text-color">
          We respect your privacy. Your information will never be shared.
        </p>
      </main>
    </>
  );
}
