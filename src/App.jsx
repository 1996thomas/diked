import React, { useRef, useEffect, useState } from "react";
import Experience from "./Experience";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import FirstSection from "./components/Sections/FirstSection";
import ThirdSection from "./components/Sections/ThirdSection";
import FourthSections from "./components/Sections/FourthSections";
import SecondSection from "./components/Sections/SecondSection";
import { Html, Loader, useProgress } from "@react-three/drei";
import { Suspense } from "react";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

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

    // Ensure to remove the event listener on cleanup
    return () => {
      window.removeEventListener("resize", updateHtmlWidth);
    };
  }, [pages.length]);

  useEffect(() => {
    if (htmlWidth > 0) {
      handleScroll(); // Set initial rotation and scroll position after htmlWidth is set
    }
  }, [htmlWidth]);

  useEffect(() => {
    const htmlWrapper = htmlDivRef.current;
    if (htmlWrapper) {
      htmlWrapper.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      if (htmlWrapper) {
        htmlWrapper.removeEventListener("scroll", handleScroll);
      }
    };
  }, [htmlWidth]);

  return (
    <>
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
        <div className="main__wrapper" ref={htmlDivRef}>
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
