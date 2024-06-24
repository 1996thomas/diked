import {
  Environment,
  Float,
  Scroll,
  ScrollControls,
  useGLTF,
} from "@react-three/drei";
import gsap from "gsap";
import React, { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import useWindowDimensions from "./hooks/useWindowDimensions";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
export default function Experience() {
  const { documentWidth } = useWindowDimensions();
  const [scrollPosition, setScrollPosition] = useState(0);
  const groupRef = useRef();
  const meshRef1 = useRef();
  const meshRef2 = useRef();

  const loader = new DRACOLoader();
  loader.setDecoderPath("/examples/jsm/libs/draco/");
  loader.preload();
  const gltfLoader = new GLTFLoader();
  gltfLoader.setDRACOLoader(loader);

  const { nodes: nodes1, materials: materials1 } = useGLTF(
    "/Logo2_.gltf",
    true,
    gltfLoader
  );
  const { nodes: nodes2, materials: materials2 } = useGLTF(
    "/Logo_.gltf",
    true,
    gltfLoader
  );

  // Ensure all materials are transparent initially
  useEffect(() => {
    Object.values(materials1).forEach((material) => {
      console.log(material);
      if (material.normalMap) {
        material.normalMap = material.normalMap; // Ensure the normal map is correctly assigned
      }
      if (material.bumpMap) {
        material.bumpMap = material.bumpMap; // Ensure the bump map is correctly assigned
        material.bumpScale = 1; // Adjust bump scale if necessary
      }
    });
    Object.values(materials2).forEach((material) => {
      material.transparent = true;
      material.opacity = 0;
      if (material.normalMap) {
        material.normalMap = material.normalMap; // Ensure the normal map is correctly assigned
      }
      if (material.bumpMap) {
        material.bumpMap = material.bumpMap; // Ensure the bump map is correctly assigned
        material.bumpScale = 1; // Adjust bump scale if necessary
      }
    });
  }, [materials1, materials2]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollX);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    const scrollPercentage = (scrollPosition / documentWidth) * 100;
    const currentPage = Math.floor(scrollPercentage / 100);
    const pageScrollPercentage = (scrollPercentage % 100) / 100;
    const rotationY = pageScrollPercentage * Math.PI * 2;
    console.log(scrollPercentage, documentWidth, scrollPosition);

    if (groupRef.current && meshRef1.current && meshRef2.current) {
      gsap.to(groupRef.current.rotation, {
        y: rotationY + currentPage * Math.PI * 2,
        duration: 1,
        ease: "power1.out",
      });

      const opacity1 = currentPage === 0 ? 1 - pageScrollPercentage : 0;
      const opacity2 =
        currentPage === 1 ? pageScrollPercentage : currentPage === 2 ? 1 : 0;

      meshRef1.current.traverse((child) => {
        if (child.isMesh) {
          gsap.to(child.material, {
            opacity: opacity1,
            duration: 1,
            ease: "power1.out",
          });
        }
      });
      meshRef2.current.traverse((child) => {
        if (child.isMesh) {
          gsap.to(child.material, {
            opacity: opacity2,
            duration: 1,
            ease: "power1.out",
          });
        }
      });
    }
  }, [scrollPosition, documentWidth]);

  return (
    <Canvas>
      <Environment preset="city" />
      <ambientLight />
      <pointLight position={[0, 2, 1]} intensity={100} />
      <Float speed={10} rotationIntensity={1} floatIntensity={1}>
        <group ref={groupRef}>
          <primitive ref={meshRef1} object={nodes1.Scene} />
          <primitive ref={meshRef2} object={nodes2.Scene} />
        </group>
      </Float>
    </Canvas>
  );
}

useGLTF.preload("/Logo2_.gltf");
useGLTF.preload("/Logo_.gltf");
