import React, { useRef, useEffect, useState } from "react";
import Experience from "./Experience";
import "./App.scss";
import { Canvas } from "@react-three/fiber";
import FirstSection from "./components/Sections/FirstSection";
import ThirdSection from "./components/Sections/ThirdSection";
import SecondSection from "./components/Sections/SecondSection";
import { Loader } from "@react-three/drei";
import Nav from "./components/Nav";

export default function App() {
  const pages = [
    { id: "first", content: <FirstSection /> },
    { id: "second", content: <SecondSection /> },
    { id: "third", content: <ThirdSection /> },
  ];

  const canvasStyle = {
    position: "fixed",
    zIndex: "1000",
    pointerEvents: "none",
  };


  const htmlDivRef = useRef();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [htmlWidth, setHtmlWidth] = useState(0);
  const [totalRotation, setTotalRotation] = useState(0);

  const handleScroll = () => {
    if (htmlDivRef.current && htmlWidth > 0) {
      const position = htmlDivRef.current.scrollLeft;
      setScrollPosition(position);
      const rotation = (position / htmlWidth) * 360 * pages.length;
      setTotalRotation(rotation);
    }
  };

  useEffect(() => {
    const updateHtmlWidth = () => {
      if (htmlDivRef.current) {
        setHtmlWidth(htmlDivRef.current.clientWidth * pages.length);
      }
    };

    updateHtmlWidth();
    window.addEventListener("resize", updateHtmlWidth);

    return () => {
      window.removeEventListener("resize", updateHtmlWidth);
    };
  }, [pages.length]);

  useEffect(() => {
    const htmlWrapper = htmlDivRef.current;
    if (htmlWrapper) {
      htmlWrapper.addEventListener("scroll", handleScroll, { passive: true });

      // Initial scroll handling to set the initial rotation properly
      handleScroll();
    }

    return () => {
      if (htmlWrapper) {
        htmlWrapper.removeEventListener("scroll", handleScroll);
      }
    };
  }, [htmlWidth]);

  return (
    <>
      <Nav />
      <Canvas style={canvasStyle}>
        <Experience
          rotationY={totalRotation}
          scrollPosition={scrollPosition}
          htmlWidth={htmlWidth}
          pagesLength={pages.length}
        />
      </Canvas>
      <Loader />

      <div
        className="htmlWrapper"
        style={{ overflowX: "scroll", display: "flex", width: "100vw" }}
      >
        <div className="main__wrapper" ref={htmlDivRef} onWheel={handleScroll}>
          {pages.map((page, index) => (
            <section key={index} id={page.id} className="page">
              {page.content}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
