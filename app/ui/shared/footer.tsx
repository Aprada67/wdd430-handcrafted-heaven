export default function Footer() {
  return (
    <footer className="mt-16">

      {/* Top accent line */}
      <div className="h-1 bg-[#8c3f23]" />

      {/* Main footer */}
      <div className="bg-[#8c3f23] text-white">
        <div className="max-w-7xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-3">

          {/* Brand */}
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Handcrafted Heaven
            </h3>
            <p className="text-sm text-white/90 max-w-sm">
              Discover unique handmade products crafted with care and passion.
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-medium mb-2">Company</h4>
            <ul className="space-y-1 text-sm">
              <li><a href="/about" className="hover:underline">About Us</a></li>
              <li><a href="/test" className="hover:underline">Careers</a></li>
              <li><a href="/test" className="hover:underline">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-medium mb-2">Support</h4>
            <ul className="space-y-1 text-sm">
              <li><a href="/test" className="hover:underline">FAQ</a></li>
              <li><a href="/test" className="hover:underline">Shipping</a></li>
              <li><a href="/test" className="hover:underline">Returns</a></li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/20 mx-6" />

        {/* Copyright (moved up & tighter) */}
        <div className="bg-background text-text text-center py-3 text-xs">
          © {new Date().getFullYear()} Handcrafted Heaven. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
