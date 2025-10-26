export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-6 p-6">
      {children}
    </div>
  )
}
