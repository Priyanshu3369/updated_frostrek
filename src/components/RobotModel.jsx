import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function RobotModel({ isSpeaking = false, ...props }) {
  const group = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  const eyeParts = useRef([]);
  const mouthParts = useRef([]);
  const earParts = useRef([]);

  const blinkTimer = useRef(0);
  const blinkDuration = 0.12; 
  const nextBlink = useRef(Math.random() * 3 + 3);
  const blinking = useRef(false);

  const { scene } = useGLTF("/models/genkub_greeting_robot.glb", true);

  useEffect(() => {
    const handle = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  useEffect(() => {
    eyeParts.current = [];
    mouthParts.current = [];
    earParts.current = [];

    scene.traverse((child) => {
      if (!child.isMesh) return;

      const name = child.name.toLowerCase();

      const mat = child.material.clone();
      mat.metalness = 1;
      mat.roughness = 0.35;
      mat.color = new THREE.Color("#0d0f12");

      if (
        name.includes("arm") ||
        name.includes("body") ||
        name.includes("torso") ||
        name.includes("leg")
      ) {
        mat.emissive.set(0x000000);
        mat.emissiveIntensity = 0;
        mat.transparent = false;
        child.material = mat;
        return;
      }

      if (name.includes("eye")) {
        mat.emissive.set("#ffffff");
        mat.emissiveIntensity = 1.4;
        mat.transparent = true;
        mat.opacity = 1;
        child.material = mat;
        eyeParts.current.push(child);
        return;
      }

      if (name.includes("mouth")) {
        mat.emissive.set("#ffffff");
        mat.emissiveIntensity = 1.3;
        mat.transparent = true;
        mat.opacity = 1;
        child.material = mat;
        mouthParts.current.push(child);
        return;
      }

      if (name.includes("ear")) {
        mat.emissive.set("#ffffff");
        mat.emissiveIntensity = 1.3;
        mat.transparent = false;
        child.material = mat;
        earParts.current.push(child);
        return;
      }

      mat.emissive.set(0x000000);
      mat.emissiveIntensity = 0;
      child.material = mat;
    });

    scene.rotation.set(-0.2, -Math.PI / 3.5, 0.2);
    scene.updateMatrixWorld(true);
  }, [scene]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (group.current) {
      group.current.position.y = Math.sin(t * 0.8) * 0.02;
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        mouse.current.x * 0.35,
        0.08
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        mouse.current.y * 0.15,
        0.08
      );
    }

    blinkTimer.current += delta;

    if (!blinking.current && blinkTimer.current > nextBlink.current) {
      blinking.current = true;
      blinkTimer.current = 0;
    }

    if (blinking.current) {
      const half = blinkDuration / 2;
      const p = blinkTimer.current;

      let opacity = 1;
      if (p < half) {
        opacity = THREE.MathUtils.lerp(1, 0.05, p / half);
      } else if (p < blinkDuration) {
        opacity = THREE.MathUtils.lerp(0.05, 1, (p - half) / half);
      } else {
        blinking.current = false;
        blinkTimer.current = 0;
        nextBlink.current = Math.random() * 3 + 3;
      }

      eyeParts.current.forEach((eye) => {
        eye.material.opacity = opacity;
      });
    }

    const speakPulse = isSpeaking
      ? (Math.sin(t * 12) + 1) / 2
      : 0;

    mouthParts.current.forEach((mouth) => {
      mouth.material.emissiveIntensity = THREE.MathUtils.lerp(
        mouth.material.emissiveIntensity,
        isSpeaking ? 1.4 + speakPulse * 0.8 : 1.3,
        0.2
      );

      mouth.material.opacity = THREE.MathUtils.lerp(
        mouth.material.opacity,
        isSpeaking ? 0.85 + speakPulse * 0.15 : 1,
        0.2
      );
    });

    earParts.current.forEach((ear) => {
      ear.material.emissiveIntensity = THREE.MathUtils.lerp(
        ear.material.emissiveIntensity,
        isSpeaking ? 1.6 : 1.3,
        0.1
      );
    });
  });

  return (
    <group ref={group} {...props}>
      <primitive object={scene} scale={1.7} />
    </group>
  );
}

useGLTF.preload("/models/genkub_greeting_robot.glb");
