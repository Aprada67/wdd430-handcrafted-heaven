import Link from "next/link";

const categories = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function NavBar() {
  return (
    <nav className="bg-primary px-6 py-3 md:px-6">
      <ul className="flex justify-between items-center overflow-x-auto whitespace-nowrap text-white text-sm">
        {categories.map((category) => (
          <li key={category.name} className="flex-1 flex justify-center">
            <Link
              href={category.href}
              className="w-full py-2 flex justify-center items-center rounded cursor-pointer text-text hover:bg-interactive hover:text-white transition-colors duration-200"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}