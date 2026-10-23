import { FALLBACK_ITEM_ID, SEED_ITEMS } from "@/data/items";
import ItemDetails from "@/components/items/ItemDetails";

// Static export: pre-build a page for every demo product, plus one fallback page.
// Products added later only exist in the browser; the host rewrites their URLs to the
// fallback page (see public/_redirects), and ItemDetails reads the real id from the URL.
export function generateStaticParams() {
  return [...SEED_ITEMS.map((item) => ({ id: item.id })), { id: FALLBACK_ITEM_ID }];
}

export const dynamicParams = false;

export default function ItemDetailsPage() {
  return <ItemDetails />;
}
