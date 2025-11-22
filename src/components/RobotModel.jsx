import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function RobotModel(props) {
  const group = useRef();


  const eyeParts = useRef([]);
  const mouthParts = useRef([]);
  const earParts = useRef([]);


  const headPivot = useRef(null);

  const { scene } = useGLTF("/models/genkub_greeting_robot.glb", true);

  useEffect(() => {
    eyeParts.current = [];
    mouthParts.current = [];
    earParts.current = [];


    const unwantedNames = [
      "Cylinder",
      "Cylinder_1",
      "Cylinder.001",
      "Cone",
      "Cone_1",
      "Tube",
      "Circle",
      "BezierCurve",
      "Null",
      "Empty",
      "Cube_HeadAttachment",
      "Object",
      "Object_2",
    ];

    scene.traverse((child) => {
      if (!child.isMesh) return;

      if (
        unwantedNames.includes(child.name) ||
        child.name.toLowerCase().includes("cylinder") ||
        child.name.toLowerCase().includes("cone") ||
        child.name.toLowerCase().includes("cube.001") ||
        child.name.toLowerCase().includes("tube")
      ) {
        child.visible = false;
        return;
      }

      child.material = child.material.clone();
      child.material.metalness = 1;
      child.material.roughness = 0.35;
      child.material.color = new THREE.Color("#0d0f12");

      if (
        child.name === "Eyes" ||
        child.name === "Eyes Move" ||
        child.name === "Left Eye Move" ||
        child.name === "Right Eye Move"
      ) {
        const m = child.material.clone();
        m.color.set("#fff");
        m.emissive.set("#fff");
        m.emissiveIntensity = 1.5;
        child.material = m;
        eyeParts.current.push(child);
      }

      if (
        child.name === "Mouth" ||
        child.name === "Mouth Move" ||
        child.name === "Mouth Move 2"
      ) {
        const m = child.material.clone();
        m.color.set("#fff");
        m.emissive.set("#fff");
        m.emissiveIntensity = 1.5;
        child.material = m;
        mouthParts.current.push(child);
      }

      if (child.name === "Ears") {
        const m = child.material.clone();
        m.color.set("#fff");
        m.emissive.set("#fff");
        m.emissiveIntensity = 1.5;
        child.material = m;
        earParts.current.push(child);
      }
    });

    const neckNode =
      scene.getObjectByName("Neck") ||
      scene.getObjectByName("Head_1") ||
      scene.getObjectByName("Head");

    if (neckNode && neckNode.parent) {
      const pivot = new THREE.Group();
      pivot.position.copy(neckNode.position);
      pivot.quaternion.copy(neckNode.quaternion);

      neckNode.parent.add(pivot);
      pivot.add(neckNode);

      headPivot.current = pivot;
    }
  }, [scene]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (group.current) {
      group.current.position.y = Math.sin(t * 1.2) * 0.03 + 0.04;
      group.current.rotation.x = Math.sin(t * 0.25) * 0.15;
      group.current.rotation.y = Math.sin(t * 0.3) * 0.4;
      group.current.rotation.z = Math.sin(t * 0.18) * 0.1;
    }

    const pulse = (Math.sin(t * 2) + 1) / 2;
    const cyan = { r: 103 / 255, g: 232 / 255, b: 249 / 255 };

    const applyGlow = (mesh) => {
      if (!mesh) return;
      const r = THREE.MathUtils.lerp(1, cyan.r, pulse);
      const g = THREE.MathUtils.lerp(1, cyan.g, pulse);
      const b = THREE.MathUtils.lerp(1, cyan.b, pulse);
      mesh.material.emissive.setRGB(r, g, b);
      mesh.material.color.setRGB(r, g, b);
    };

    eyeParts.current.forEach(applyGlow);
    mouthParts.current.forEach(applyGlow);
    earParts.current.forEach(applyGlow);

    if (headPivot.current) {
      const pivot = headPivot.current;
      const target = state.camera.position.clone();

      pivot.parent.worldToLocal(target);

      const currentQ = pivot.quaternion.clone();
      pivot.lookAt(target);
      const targetQ = pivot.quaternion.clone();

      pivot.quaternion.copy(currentQ);
      pivot.quaternion.slerp(targetQ, 0.15);
    }
  });

  return (
    <group ref={group} {...props}>
      <primitive object={scene} scale={1.7} rotation={[0, Math.PI, 0]} />
    </group>
  );
}

useGLTF.preload("/models/genkub_greeting_robot.glb");
