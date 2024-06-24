import { Environment, Float, useGLTF } from "@react-three/drei";
import Model from "./Model";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import * as THREE from "three";
import Rock from "./components/Models/Rock";
import Puce from "./components/Models/Puce";
import Metal from "./components/Models/Metal";

// const models = [
//   { url: "/ptitepute3.glb", color: 0x00f0ff, texture: "/rock.jpg" },
//   { url: "/ptitepute1.glb", color: 0x00ff00, texture: "/rock.jpg" },
//   { url: "/ptitepute2.glb", color: 0x0000ff, texture: "/rock.jpg" },
//   { url: "/ptitepute0.glb", color: 0xffffff, texture: "/rock.jpg" },
// ];

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
      <ambientLight color={"blue"} intensity={1000} />
      <Float>
        <group ref={modelRef}>
          <Rock opacity={opacities[0]}/>
          <Puce opacity={opacities[1]}/>
          <Metal opacity={opacities[2]}/>
          {/* {models.map((model, index) => (
            <Model
              key={index}
              url={model.url}
              color={model.color}
              opacity={opacities[index]}
              texture={model.texture}
            />
          ))} */}
        </group>
      </Float>
    </>
  );
}

// models.map((model) => useGLTF.preload(model.url));
