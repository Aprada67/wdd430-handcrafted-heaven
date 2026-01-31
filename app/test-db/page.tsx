import { getProducts } from '../lib/products';

export default async function Page() {
  const products = await getProducts();

  return (
    <main>
      <h1 className="mb-4 text-2xl font-semibold">
        Test DB Connection
      </h1>

      <pre className="rounded bg-gray-100 p-4 text-sm overflow-auto">
        {JSON.stringify(products, null, 2)}
      </pre>
    </main>
  );
}
