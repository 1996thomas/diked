import { Environment, Float, useGLTF } from "@react-three/drei";
import Model from "./Model";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import * as THREE from "three";

const models = [
  { url: "/ptitepute0.glb", color: 0x000000 },
  { url: "/ptitepute1.glb", color: 0x00ff00 },
  { url: "/ptitepute2.glb", color: 0x0000ff },
  { url: "/ptitepute3.glb", color: 0x00f0ff },
];

export default function Experience({
  rotationY,
  scrollPosition,
  htmlWidth,
  pagesLength,
}) {
  const modelRef = useRef();
  const [opacities, setOpacities] = useState(Array(pagesLength).fill(0));

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
      <ambientLight color={"red"} intensity={1} />
      <Float>
        <group ref={modelRef}>
          {models.map((model, index) => (
            <Model
              key={index}
              url={model.url}
              color={model.color}
              opacity={opacities[index]}
            />
          ))}
        </group>
      </Float>
    </>
  );
}

models.map((model) => useGLTF.preload(model.url));
