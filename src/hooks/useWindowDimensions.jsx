import { useState, useEffect } from "react";

function getWindowDimensions() {
  const { innerWidth: viewportWidth, innerHeight: viewportHeight } = window;
  const {
    scrollWidth: documentWidth,
    scrollHeight: documentHeight,
    offsetWidth,
    offsetHeight,
  } = document.documentElement;

  const htmlSlider = document.querySelector(".html-slider");
  const sliderWidth = htmlSlider ? htmlSlider.scrollWidth : 0;
  return {
    viewportWidth,
    viewportHeight,
    documentWidth,
    documentHeight,
    offsetWidth,
    offsetHeight,
    sliderWidth,
  };
}


export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    function handleScroll() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return windowDimensions;
}
