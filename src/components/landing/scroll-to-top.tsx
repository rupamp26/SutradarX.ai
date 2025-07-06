"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowUp } from "lucide-react";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={scrollToTop}
        className={`rounded-full p-3 transition-all duration-300 ${
          isVisible ? "scale-100" : "scale-0"
        }`}
      >
        <ArrowUp size={24} />
      </Button>
    </div>
  );
};
