import { Scroll, ScrollControls, OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import React, { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import useWindowDimensions from "./hooks/useWindowDimensions";

export default function Experience() {
  const htmlContainerRef = useRef();
  const { sliderWidth, offsetHeight } = useWindowDimensions(htmlContainerRef);
  const groupRef = useRef();
  const meshRefs = useRef([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const pages = 5;
    const scrollPercentage = (scrollPosition / offsetHeight) * 100;
    const currentPage = Math.floor(scrollPercentage / 100);
    const pageScrollPercentage = (scrollPercentage % 100) / 100;
    const rotationY = (pageScrollPercentage * Math.PI * 2) * (offsetHeight / sliderWidth);

    if (groupRef.current && meshRefs.current.length === pages) {
      gsap.to(groupRef.current.rotation, {
        y: rotationY + currentPage * Math.PI * 2,
        duration: 1,
        ease: "power1.out",
      });

      for (let i = 0; i < pages; i++) {
        const opacity =
          currentPage === i
            ? 1 - pageScrollPercentage
            : currentPage === i - 1
            ? pageScrollPercentage
            : currentPage === i + 1
            ? 0
            : 0;
        gsap.to(meshRefs.current[i].material, {
          opacity: opacity,
          duration: 1,
          ease: "power1.out",
        });
      }
    }
  }, [scrollPosition, offsetHeight, sliderWidth]);

  return (
    <>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <ScrollControls pages={2} horizontal>
          <Scroll html>
            <div
              ref={htmlContainerRef}
              className="html-slider"
              style={{ width: "200vw", height: "100vh", position: "relative" }}
            >
              <div style={{ position: "absolute", left: "0vw" }}>
                Page 1 Content
              </div>
              <div style={{ position: "absolute", left: "100vw" }}>
                Page 2 Content
              </div>
              <div style={{ position: "absolute", left: "200vw" }}>
                Page 3 Content
              </div>
              <div style={{ position: "absolute", left: "300vw" }}>
                Page 4 Content
              </div>
              <div style={{ position: "absolute", left: "400vw" }}>
                Page 5 Content
              </div>
            </div>
          </Scroll>
          <group ref={groupRef}>
            <mesh ref={(el) => (meshRefs.current[0] = el)}>
              <boxGeometry args={[2, 2, 2]} />
              <meshStandardMaterial color={"blue"} transparent opacity={1} />
            </mesh>
            <mesh ref={(el) => (meshRefs.current[1] = el)}>
              <boxGeometry args={[2, 2, 2]} />
              <meshStandardMaterial color={"red"} transparent opacity={0} />
            </mesh>
            <mesh ref={(el) => (meshRefs.current[2] = el)}>
              <boxGeometry args={[2, 2, 2]} />
              <meshStandardMaterial color={"green"} transparent opacity={0} />
            </mesh>
            <mesh ref={(el) => (meshRefs.current[3] = el)}>
              <boxGeometry args={[2, 2, 2]} />
              <meshStandardMaterial color={"yellow"} transparent opacity={0} />
            </mesh>
            <mesh ref={(el) => (meshRefs.current[4] = el)}>
              <boxGeometry args={[2, 2, 2]} />
              <meshStandardMaterial color={"purple"} transparent opacity={0} />
            </mesh>
          </group>
        </ScrollControls>
      </Canvas>
    </>
  );
}
