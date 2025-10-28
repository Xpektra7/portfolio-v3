"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase"; // your firebase.ts file

interface Blog {
  id: string;
  title: string;
  content: any;
  createdAt: any;
}

export default function BlogsList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const blogData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Blog[];
      setBlogs(blogData);
    };
    fetchBlogs();
  }, []);

  return (
    <div className="grid gap-4 ">
      {blogs.map((blog) => (
        <div key={blog.id} className="flex flex-col gap-2 border p-4 rounded">
          <div className="flex justify-between gap-2">
            <h2 className="text-xs md:text-sm font-bold ">{blog.title}</h2>
            <p className="text-xs">{blog.createdAt?.toDate().toLocaleDateString() || "Unknown date"}</p>
          </div>
          <p className="text-xs line-clamp-1">
            {blog.content?.blocks?.[1]?.data?.text || "No preview available"}
          </p>
        </div>
      ))}
    </div>
  );
}
