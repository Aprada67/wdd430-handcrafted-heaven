import { addProduct } from "@/app/products/actions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function NewProductPage() {
  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800">Add new product</h1>
      <p className="text-gray-500 mt-1">
        Fill the details and create your product.
      </p>

      <form action={addProduct} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            name="name"
            required
            className="mt-1 w-full rounded-md border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-[#D98B61]/50"
            placeholder="Handmade Clay Mug"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            name="price"
            type="number"
            step="0.01"
            required
            className="mt-1 w-full rounded-md border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-[#D98B61]/50"
            placeholder="28.00"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image path
          </label>
          <input
            name="image"
            required
            className="mt-1 w-full rounded-md border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-[#D98B61]/50"
            placeholder="/products/ceramic-mug.jpg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            rows={5}
            required
            className="mt-1 w-full rounded-md border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-[#D98B61]/50"
            placeholder="A handcrafted ceramic mug shaped and glazed by hand..."
          />
        </div>

        <button className="w-full bg-[#8C3F23] hover:bg-[#A6592D] text-white py-3 rounded-md shadow-md transition active:scale-95">
          Create product
        </button>
      </form>
    </div>
  );
}