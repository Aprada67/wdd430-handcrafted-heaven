import Header from "../ui/home/header";
import NavBar from "../ui/home/nav-bar";
import Image from "next/image";

export default function CartPage() {
  // Placeholder cart items (replace later with real cart state / DB)
  const cartItems = [
    {
      id: 1,
      name: "Handcrafted Ceramic Mug",
      price: 24.99,
      image: "/images/pot.png",
      quantity: 1,
    },
    {
      id: 2,
      name: "Woven Basket",
      price: 39.99,
      image: "/images/pot.png",
      quantity: 2,
    },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* Header */}
      <Header />

      {/* NavBar */}
      <NavBar />

      <main className="mx-auto max-w-6xl px-6 py-8 mt-4 md:mt-12">
        <h1 className="text-3xl font-bold mb-8 text-text">
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-text">
            Your cart is empty.
          </p>
        ) : (
          <div className="grid gap-10 md:grid-cols-3">

            {/* LEFT: Cart Items */}
            <div className="md:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-secondary rounded-lg"
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <h2 className="font-semibold text-text">
                        {item.name}
                      </h2>
                      <p className="text-sm text-text">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="font-medium text-text">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT: Order Summary */}
            <div className="p-6 bg-secondary rounded-lg h-fit">
              <h2 className="text-xl font-semibold mb-4 text-text">
                Order Summary
              </h2>

              <div className="flex justify-between text-sm mb-2 text-text">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm mb-4 text-text">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>

              <hr className="mb-4" />

              <div className="flex justify-between font-semibold text-text mb-6">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <button
                className="w-full py-3 rounded-lg bg-primary text-white font-medium cursor-not-allowed opacity-70"
                disabled
              >
                Checkout (Coming Soon)
              </button>
            </div>

          </div>
        )}
      </main>
    </>
  );
}
