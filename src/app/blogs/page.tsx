"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase"; // your firebase.ts file
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Error from "../admin/blogs/error";
import Loading from "../admin/blogs/loading";

interface Blog {
  id: string;
  title: string;
  content: any;
  createdAt: any;
}

export default function BlogsList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        const blogData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Blog[];
        setBlogs(blogData.reverse());
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (error) return <Error />;

  return (
    <div className="flex flex-col w-full">
      <Button variant="link" className="text-xs w-full rounded-none justify-start items-left self-start p-0 mb-8 pb-2 border-b border-border text-left" asChild>
        <Link href="/">
          <ArrowLeft className="size-4" />
          Back to Top
        </Link>
      </Button>




      {!loading ? (
        <div className="grid gap-4">
          {blogs.map((blog) => (
            <Link href={`/blogs/${blog.id}`} key={blog.id} className="flex flex-col gap-2 border p-4 rounded">
              <div className="flex justify-between gap-2">
                <h2 className="text-xs md:text-sm font-bold ">{blog.title}</h2>
                <p className="text-xs">{blog.createdAt?.toDate().toLocaleDateString() || "Unknown date"}</p>
              </div>
              <p className="text-xs line-clamp-1">
                {blog.content?.blocks?.[1]?.data?.text || "No preview available"}
              </p>
            </Link>
          ))}
        </div>) : <Loading />}

    </div>
  );
}
