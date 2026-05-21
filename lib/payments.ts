import Stripe from "stripe";
import { products } from "@/config/products";

export type PaymentProvider = "stripe" | "mercado-pago" | "demo";

type CheckoutOptions = {
  productId: string;
  provider?: PaymentProvider;
  appUrl: string;
  userEmail?: string | null;
  userId?: string | null;
};

type MercadoPagoPreferenceResponse = {
  init_point?: string;
  sandbox_init_point?: string;
  id?: string;
  message?: string;
};

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export async function createCheckoutUrl({
  productId,
  provider = "demo",
  appUrl,
  userEmail,
  userId
}: CheckoutOptions) {
  const product = products.find((item) => item.id === productId);

  if (!product) {
    throw new Error("Producto no encontrado");
  }

  if (provider === "demo") {
    return `${appUrl}/gracias?product=${product.id}&provider=demo`;
  }

  if (provider === "stripe") {
    return createStripeCheckoutUrl({ product, appUrl, userEmail, userId });
  }

  return createMercadoPagoCheckoutUrl({ product, appUrl, userEmail, userId });
}

async function createStripeCheckoutUrl({
  product,
  appUrl,
  userEmail,
  userId
}: {
  product: (typeof products)[number];
  appUrl: string;
  userEmail?: string | null;
  userId?: string | null;
}) {
  if (!stripe) {
    throw new Error("Falta configurar STRIPE_SECRET_KEY en Render.");
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: userEmail ?? undefined,
    client_reference_id: userId ?? undefined,
    metadata: {
      productId: product.id,
      userId: userId ?? ""
    },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: normalizeCurrency(product.currency),
          unit_amount: product.price * 100,
          product_data: {
            name: product.name,
            description: product.description
          }
        }
      }
    ],
    success_url: `${appUrl}/gracias?provider=stripe&product=${product.id}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/producto?checkout=cancelled&provider=stripe&product=${product.id}`,
    locale: "es-419"
  });

  if (!session.url) {
    throw new Error("Stripe no devolvió URL de pago.");
  }

  return session.url;
}

async function createMercadoPagoCheckoutUrl({
  product,
  appUrl,
  userEmail,
  userId
}: {
  product: (typeof products)[number];
  appUrl: string;
  userEmail?: string | null;
  userId?: string | null;
}) {
  const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error("Falta configurar MERCADO_PAGO_ACCESS_TOKEN en Render.");
  }

  const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      items: [
        {
          id: product.id,
          title: product.name,
          description: product.description,
          quantity: 1,
          currency_id: normalizeCurrency(product.currency).toUpperCase(),
          unit_price: product.price
        }
      ],
      payer: userEmail ? { email: userEmail } : undefined,
      external_reference: [userId, product.id].filter(Boolean).join(":"),
      back_urls: {
        success: `${appUrl}/gracias?provider=mercado-pago&product=${product.id}`,
        failure: `${appUrl}/producto?checkout=failure&provider=mercado-pago&product=${product.id}`,
        pending: `${appUrl}/gracias?provider=mercado-pago&status=pending&product=${product.id}`
      },
      auto_return: "approved",
      metadata: {
        product_id: product.id,
        user_id: userId ?? ""
      }
    })
  });
  const preference = (await response.json()) as MercadoPagoPreferenceResponse;

  if (!response.ok) {
    throw new Error(preference.message ?? "Mercado Pago no pudo crear la preferencia.");
  }

  const checkoutUrl =
    process.env.MERCADO_PAGO_USE_SANDBOX === "true"
      ? preference.sandbox_init_point
      : preference.init_point;

  if (!checkoutUrl) {
    throw new Error("Mercado Pago no devolvió URL de pago.");
  }

  return checkoutUrl;
}

function normalizeCurrency(currency: string) {
  return currency.toLowerCase().includes("mxn") ? "mxn" : currency.toLowerCase();
}
