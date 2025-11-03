"use client";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import ErrorComponent from "../../components/error";

interface Project {
  id?: string;
  title: string;
  desc: string;
  image: string;
  liveLink: string;
  gitLink: string;
  category: string;
}

interface Blog {
  id: string;
  title: string;
  content: any;
  createdAt: any;
}


export default function AdminHome() {
  const [projects, setProjects] = useState(0);
  const [blogs, setBlogs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const snapshot = await getDocs(collection(db, "projects"));
        const data: Project[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Project, "id">),
        }));
        setProjects(data.length);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    const fetchBlogs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        const blogData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Blog[];
        setBlogs(blogData.length);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };


    fetchProjects();
    fetchBlogs();
  }, []);

  if (error) return <ErrorComponent />


  return (

    !loading ? (
      <div>
        <p>Projects : {projects}</p>
        <p>Blogs : {blogs}</p>
      </div>
    ) : (
      <p>Loading...</p>
    )

  );
}
