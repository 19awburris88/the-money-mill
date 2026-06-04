import { randomUUID } from 'crypto';

const SQUARE_API = 'https://connect.squareup.com/v2';
const SQUARE_VERSION = '2024-10-17';

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const token = process.env.SQUARE_ACCESS_TOKEN;
  const locationId = process.env.SQUARE_LOCATION_ID;
  // Netlify sets URL automatically; fallback for local dev
  const siteUrl = process.env.URL ?? 'http://localhost:8888';

  if (!token || !locationId) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Square credentials not configured (SQUARE_ACCESS_TOKEN, SQUARE_LOCATION_ID)' }),
    };
  }

  try {
    const { items } = JSON.parse(event.body);

    if (!items?.length) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Cart is empty' }) };
    }

    const lineItems = items.map((item) => ({
      quantity: String(item.quantity),
      catalog_object_id: item.variationId,
      item_type: 'ITEM',
    }));

    const res = await fetch(`${SQUARE_API}/online-checkout/payment-links`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Square-Version': SQUARE_VERSION,
      },
      body: JSON.stringify({
        idempotency_key: randomUUID(),
        order: {
          location_id: locationId,
          line_items: lineItems,
        },
        checkout_options: {
          redirect_url: `${siteUrl}/order-success`,
        },
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.errors?.[0]?.detail ?? 'Failed to create checkout link');
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: data.payment_link.url }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
