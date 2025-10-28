import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Loader className="animate-spin size-8 text-foreground" />
    </div>
  );
}
