"use client";
import { useState, useEffect, use } from 'react';
import Output from "editorjs-react-renderer";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase"; // your firebase.ts file
import Loading from '../loading';
import Error from '../error';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useParams } from 'next/navigation';
interface Blog {
  id: string;
  title: string;
  content: any;
  createdAt: any;
}


export default function Blog() {
  const [blog, setBlog] = useState<Blog>({ id: '', title: '', content: null, createdAt: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = useParams();

  console.log("Blog ID:", id);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        const blogData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Blog[];
        blogData.find(b => {
          if (b.id === id) {
            setBlog(b);
          }
        });
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (error) return <Error />;
  if (loading) return <Loading />;

  return (
    <div className="relative border-border">
      <>
        <Button variant="link" className="text-xs self-start p-0" asChild>
          <Link href="/blogs" className='hover:text-foreground'>
            <ArrowLeft className="size-4" />
            Back to Blogs
          </Link>
        </Button>
        <hr />
      </>

      <div className="readerjs-container mt-8">
        <Output data={blog.content}  />
      </div>
    </div>
  );
}
