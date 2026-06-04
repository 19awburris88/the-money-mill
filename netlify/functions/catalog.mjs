const SQUARE_API = 'https://connect.squareup.com/v2';
const SQUARE_VERSION = '2024-10-17';

export const handler = async () => {
  const token = process.env.SQUARE_ACCESS_TOKEN;

  if (!token) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'SQUARE_ACCESS_TOKEN is not set' }),
    };
  }

  try {
    const objects = [];
    let cursor;

    // Page through all catalog objects
    do {
      const url = new URL(`${SQUARE_API}/catalog/list`);
      url.searchParams.set('types', 'ITEM,IMAGE,CATEGORY');
      if (cursor) url.searchParams.set('cursor', cursor);

      const res = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${token}`,
          'Square-Version': SQUARE_VERSION,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.errors?.[0]?.detail ?? 'Square API error');
      }

      objects.push(...(data.objects ?? []));
      cursor = data.cursor;
    } while (cursor);

    // Build lookup maps for images and categories
    const images = {};
    objects
      .filter((o) => o.type === 'IMAGE')
      .forEach((img) => {
        images[img.id] = img.image_data?.url ?? null;
      });

    const categoryNames = {};
    objects
      .filter((o) => o.type === 'CATEGORY')
      .forEach((cat) => {
        categoryNames[cat.id] = cat.category_data?.name ?? '';
      });

    // Map ITEM objects into clean product shapes
    const products = objects
      .filter((o) => o.type === 'ITEM')
      .map((item) => {
        const d = item.item_data;
        const variations = (d.variations ?? []).map((v) => ({
          id: v.id,
          name: v.item_variation_data?.name ?? 'Regular',
          price: v.item_variation_data?.price_money?.amount ?? 0,
          currency: v.item_variation_data?.price_money?.currency ?? 'USD',
        }));

        return {
          id: item.id,
          name: d.name,
          description: d.description ?? '',
          categoryId: d.category_id ?? null,
          categoryName: d.category_id ? (categoryNames[d.category_id] ?? '') : '',
          image: d.image_ids?.[0] ? (images[d.image_ids[0]] ?? null) : null,
          variations,
        };
      });

    const categories = [...new Set(Object.values(categoryNames))].filter(Boolean);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60',
      },
      body: JSON.stringify({ products, categories }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
