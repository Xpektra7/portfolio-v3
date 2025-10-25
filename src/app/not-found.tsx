import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full py-20">
      <h1 className="text-4xl font-bold mb-4 text-foreground">404 - Page Not Found</h1>
      <p className="text-lg mb-8 text-foreground">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Button variant="link" asChild>
        <Link href="/">Go Back Home</Link>
      </Button>
    </div>
  );
}