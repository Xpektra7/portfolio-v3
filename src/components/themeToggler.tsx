"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SunMoon } from "lucide-react";

export default function ThemeToggler() {
  const [isLight, setIsLight] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const active = saved ? saved === "light" : !prefersDark;
    setIsLight(active);
    document.documentElement.classList.toggle("dark", !active);
  }, []);

  function toggleTheme(state: boolean) {
    const newState = !state;
    setIsLight(newState);
    document.documentElement.classList.toggle("dark", !newState);
    localStorage.setItem("theme", newState ? "light" : "dark");
  }

  return (
    <Button variant="ghost" size="icon-sm" onClick={() => toggleTheme(isLight)}>
      <SunMoon />
    </Button>
  );
}
