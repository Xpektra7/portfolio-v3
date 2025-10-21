import Link from "next/link";
export default function AdminLayout({children} : Readonly<{children : React.ReactNode}>){

    return(
      <div
        className={`antialiased overflow-x-hidden w-full p-2` }
      >
        <header className="p-4 w-full flex flex-col gap-4">
          <h3>Logo</h3>
          <ul className="flex gap-2 items-center">
            <li>
              <Link href="/admin">Home</Link>
            </li>
            <li>
              <Link href="/admin/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/admin/users">Users</Link>
            </li>
          </ul>
        </header>

        <div className="w-full grid grid-cols-5">
          <aside className="col-span-1 bg-gray-800">
            <p>Technology</p>
            <p>Design</p>
            <p>Business</p>
          </aside>
          <main className="col-span-4">
            {children}
          </main>
        </div>

            
        <footer className="flex flex-col justify-center items-center p-2">
          &copy; 2025   Allrights reserved
        </footer>
      </div>

    );



};