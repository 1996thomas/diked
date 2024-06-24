import { Environment, Float } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import * as THREE from "three";
import Rock from "./components/Models/Rock";
import Puce from "./components/Models/Puce";
import Metal from "./components/Models/Metal";

export default function Experience({
  rotationY,
  scrollPosition,
  htmlWidth,
  pagesLength,
}) {
  const modelRef = useRef();
  const [opacities, setOpacities] = useState(Array(pagesLength).fill(1));

  console.log('rotY',rotationY)
  console.log('htmlWidth',htmlWidth)
  console.log('scrollPos',scrollPosition)
  useEffect(() => {
    if (modelRef.current) {
      gsap.to(modelRef.current.rotation, {
        y: THREE.MathUtils.degToRad(rotationY),
        duration: 1,
      });
    }
  }, [rotationY]);

  useEffect(() => {
    if (htmlWidth > 0 && pagesLength > 0) {
      const sectionWidth = htmlWidth / pagesLength;
      const newOpacities = Array(pagesLength).fill(0);

      const currentSection = Math.floor(scrollPosition / sectionWidth);
      const sectionRelativePosition =
        (scrollPosition % sectionWidth) / sectionWidth;

      newOpacities[currentSection] = 1 - sectionRelativePosition;
      if (currentSection + 1 < pagesLength) {
        newOpacities[currentSection + 1] = sectionRelativePosition;
      }

      setOpacities(newOpacities);
    }
  }, [scrollPosition, htmlWidth, pagesLength]);

  return (
    <>
      <Environment preset="apartment" />
      <ambientLight color={"blue"} intensity={1000} />
      <Float speed={10}>
        <group ref={modelRef}>
          <Rock opacity={opacities[0]} />
          <Puce opacity={opacities[1]} />
          <Metal opacity={opacities[2]} />
        </group>
      </Float>
    </>
  );
}
