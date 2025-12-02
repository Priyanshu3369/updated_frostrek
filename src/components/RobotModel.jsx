import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function RobotModel(props) {
  const group = useRef(); 
  const headPivot = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  const eyeParts = useRef([]);
  const mouthParts = useRef([]);
  const earParts = useRef([]);

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

      const allowed = [
        "Body", "Leg", "Arm", "Head", "Neck", "Eyes", "Eyes Move",
        "Left Eye Move", "Right Eye Move", "Mouth", "Mouth Move",
        "Mouth Move 2", "Ears", "Torso"
      ];

      const match = allowed.some((a) =>
        child.name.toLowerCase().includes(a.toLowerCase())
      );

      if (!match) {
        child.visible = false;
        return;
      }

      child.material = child.material.clone();
      child.material.metalness = 1;
      child.material.roughness = 0.35;
      child.material.color = new THREE.Color("#0d0f12");

      if (child.name.includes("Eye")) {
        const m = child.material.clone();
        m.color.set("#fff");
        m.emissive.set("#fff");
        m.emissiveIntensity = 1.4;
        child.material = m;
        eyeParts.current.push(child);
      }

      if (child.name.includes("Mouth")) {
        const m = child.material.clone();
        m.color.set("#fff");
        m.emissive.set("#fff");
        m.emissiveIntensity = 1.3;
        child.material = m;
        mouthParts.current.push(child);
      }

      if (child.name.includes("Ears")) {
        const m = child.material.clone();
        m.color.set("#fff");
        m.emissive.set("#fff");
        m.emissiveIntensity = 1.3;
        child.material = m;
        earParts.current.push(child);
      }
    });

    scene.rotation.set(-0.2, -Math.PI / 3.5, 0.2);
    scene.updateMatrixWorld(true);

    const neck =
      scene.getObjectByName("Neck") ||
      scene.getObjectByName("Head") ||
      scene.getObjectByName("Head_1");

    if (neck && neck.parent) {
      const pivot = new THREE.Group();
      pivot.position.copy(neck.position);
      pivot.quaternion.copy(neck.quaternion);

      neck.parent.add(pivot);
      pivot.add(neck);

      headPivot.current = pivot;
    }
  }, [scene]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (group.current) {
      group.current.position.y = Math.sin(t * 0.8) * 0.02;

      const targetRotY = mouse.current.x * 0.35; 
      const targetRotX = mouse.current.y * 0.15;

      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        targetRotY,
        0.08
      );

      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        targetRotX,
        0.08
      );
    }

    const pulse = (Math.sin(t * 2) + 1) / 2;
    const cyan = { r: 0.35, g: 0.9, b: 1.0 };

    const glow = (mesh) => {
      mesh.material.emissive.setRGB(
        THREE.MathUtils.lerp(1, cyan.r, pulse),
        THREE.MathUtils.lerp(1, cyan.g, pulse),
        THREE.MathUtils.lerp(1, cyan.b, pulse)
      );
    };

    eyeParts.current.forEach(glow);
    mouthParts.current.forEach(glow);
    earParts.current.forEach(glow);
  });

  return (
    <group ref={group} {...props}>
      <primitive object={scene} scale={1.7} />
    </group>
  );
}

<<<<<<< HEAD
useGLTF.preload("/models/genkub_greeting_robot.glb");
=======
useGLTF.preload("/models/genkub_greeting_robot.glb");
>>>>>>> b1e05a7ccb2eb5d7e3d541973b278e03b5fff616
