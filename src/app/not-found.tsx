import { Suspense } from "react";
import NotFoundView from "@/components/NotFoundView";
import { PageLoader } from "@/components/ui/Spinner";

export default function NotFound() {
  return (
    <Suspense fallback={<PageLoader />}>
      <NotFoundView />
    </Suspense>
  );
}
