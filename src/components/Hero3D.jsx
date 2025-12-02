import { Canvas } from "@react-three/fiber";
import { Suspense, lazy } from "react";
import { OrbitControls, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

const RobotModel = lazy(() => import("./RobotModel"));

export default function Hero3D() {
  return (
    <div className="w-full h-[500px] md:h-[600px]">
      <Canvas
        camera={{ position: [2, 1.8, 3], fov: 40 }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />

        <Suspense fallback={null}>
          <RobotModel />
          <Environment preset="city" />
          <EffectComposer>
            <Bloom
  intensity={0.55}
  luminanceThreshold={0.45}
  luminanceSmoothing={0.2}
  mipmapBlur
/>


          </EffectComposer>
        </Suspense>

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> b1e05a7ccb2eb5d7e3d541973b278e03b5fff616
