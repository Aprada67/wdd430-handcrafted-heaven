import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import UserButton from "../user-button";

export default function Header() {
  return (
    <header className="flex flex-col gap-3 px-4 py-3 bg-background md:flex-row md:items-center md:gap-4">

      <div className="flex items-center w-full mx-4 gap-6">

        {/* Logo */}
        <div className="font-bold text-2xl text-text whitespace-nowrap">
          HCF HV
        </div>

        {/* Search bar */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="..."
            className="w-full px-4 py-2 rounded-md text-sm border focus:outline-none text-text"
          />
        </div>

        {/* Icons */}
        <div className="flex gap-4 whitespace-nowrap">
          <ShoppingCartIcon className="h-6 w-6 cursor-pointer text-text" />
          <UserButton />
        </div>

      </div>

    </header>
  );
}
