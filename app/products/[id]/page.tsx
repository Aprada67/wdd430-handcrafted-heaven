import { sql } from '@/app/lib/db';

export default async function Page({
  params,
}: {
  params: { id: string };
}) {
  const product = await sql`
    SELECT *
    FROM products
    WHERE id = ${params.id}
  `;

  const item = product[0];

  return (
    <main>
      <img
        src={item.image_url}
        alt={item.name}
        className="mb-4 rounded"
      />

      <h1 className="text-2xl font-semibold text-text">
        {item.name}
      </h1>

      <p className="mt-2 text-lg text-text">
        ${item.price}
      </p>

      <p className="mt-4 text-text">
        {item.description}
      </p>
    </main>
  );
}
