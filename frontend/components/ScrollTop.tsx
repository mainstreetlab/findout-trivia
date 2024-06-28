"use client";
import React from "react";
import { CgChevronUp } from "react-icons/cg";
import { Button } from "./ui/button";

const ScrollTop = () => {
  const [showTopBtn, setShowTopBtn] = React.useState(false);

  React.useEffect(() => {
    const scrollHandler = () => {
      window.scrollY > 30 ? setShowTopBtn(true) : setShowTopBtn(false);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [showTopBtn]);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    showTopBtn && (
      <Button
        onClick={handleScrollTop}
        asChild
        className="fixed bottom-20 right-8 p-1 w-12 h-12 bg-accent rounded-full text-white hover:bg-accent-hover"
      >
        <CgChevronUp />
      </Button>
    )
  );
};

export default ScrollTop;
