import { addProduct } from "@/app/products/actions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function NewProductPage() {
  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800">Add new product</h1>
      <p className="text-gray-500 mt-1">
        Choose a category and provide an image URL.
      </p>

      <form action={addProduct} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            name="name"
            required
            className="mt-1 w-full rounded-md border border-gray-200 p-3"
            placeholder="Handmade Clay Mug"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            name="price"
            type="number"
            step="0.01"
            required
            className="mt-1 w-full rounded-md border border-gray-200 p-3"
            placeholder="28.00"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="category_id"
            required
            defaultValue=""
            className="mt-1 w-full rounded-md border border-gray-200 p-3"
          >
            <option value="" disabled>
              Select category
            </option>
            <option value="1">Ceramics</option>
            <option value="2">Textiles</option>
            <option value="3">Woodwork</option>
            <option value="4">Jewelry</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            name="image_url"
            required
            className="mt-1 w-full rounded-md border border-gray-200 p-3"
            placeholder="/products/ceramic-mug.jpg  or  https://..."
          />
          <p className="mt-1 text-xs text-gray-500">
            Tip: if it’s in /public/products, use /products/filename.jpg
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            rows={5}
            required
            className="mt-1 w-full rounded-md border border-gray-200 p-3"
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