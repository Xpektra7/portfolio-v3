export default function ProjectsLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      {Array.from({ length: 3 }).map((_, idx) => (
        <div
          key={idx}
          className="flex flex-col p-2 border border-border bg-card rounded col-span-1 animate-pulse"
        >
          <div className="bg-secondary rounded w-full aspect-[calc(1366/650)] mb-2" />
          <div className="h-4 bg-secondary rounded w-3/4 mb-1" />
          <div className="h-4 bg-secondary rounded w-1/2 mb-2" />
          
        </div>
      ))}
    </div>
  );
}
