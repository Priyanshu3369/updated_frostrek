import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./TechGlobe.css";
import usePerformanceMode from "../../hooks/usePerformanceMode";

const TAU = Math.PI * 2;

const createPulseMaterial = () =>
  new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color("#14B8A6") },
    },
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    vertexShader: `
      varying vec3 vPosition;
      void main() {
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor;
      varying vec3 vPosition;

      void main() {
        float radius = length(vPosition.xy);
        float pulse = sin(uTime * 0.9 + radius * 6.0);
        float intensity = smoothstep(0.55, 0.1, radius) * (0.5 + 0.5 * pulse);
        gl_FragColor = vec4(uColor, intensity * 0.7);
      }
    `,
  });

const createFlowMaterial = () =>
  new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color("#00FFFF") },
      uColorB: { value: new THREE.Color("#6D28D9") },
    },
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      varying vec2 vUv;

      void main() {
        float wave = sin((vUv.y + uTime * 0.2) * 12.0) * 0.2;
        float band = smoothstep(0.45 + wave, 0.35 + wave, vUv.x);
        vec3 color = mix(uColorB, uColorA, band);
        float alpha = band * 0.6;
        gl_FragColor = vec4(color, alpha);
      }
    `,
  });

const TechGlobe = ({ className, enablePointer = true }) => {
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const materialsRef = useRef([]);
  const performanceMode = usePerformanceMode();

  useEffect(() => {
    if (performanceMode) {
      return undefined;
    }

    const container = containerRef.current;
    if (!container) return undefined;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2("#040507", 0.12);

    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio ?? 1, 1.75));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.classList.add("tech-globe-canvas");
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const ambientLight = new THREE.AmbientLight("#0B5B6E", 0.6);
    scene.add(ambientLight);

    const primaryLight = new THREE.PointLight("#0FFFF5", 2, 25);
    primaryLight.position.set(6, 3, 6);
    scene.add(primaryLight);

    const rimLight = new THREE.PointLight("#6D28D9", 1.5, 30);
    rimLight.position.set(-6, -4, -6);
    scene.add(rimLight);

    const globeGroup = new THREE.Group();
    group.add(globeGroup);

    const globeGeometry = new THREE.SphereGeometry(2.2, 48, 48);
    const globeMaterial = new THREE.MeshStandardMaterial({
      color: "#06060C",
      emissive: "#082F40",
      metalness: 0.6,
      roughness: 0.35,
      envMapIntensity: 1.2,
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    globeGroup.add(globe);

    const wireframeGeometry = new THREE.WireframeGeometry(
      new THREE.SphereGeometry(2.24, 28, 28),
    );
    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: "#00FFFF",
      transparent: true,
      opacity: 0.18,
    });
    const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    globeGroup.add(wireframe);

    const glowGeometry = new THREE.SphereGeometry(2.35, 40, 40);
    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uGlowColor: { value: new THREE.Color("#00FFFF") },
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uGlowColor;
        varying vec3 vNormal;

        void main() {
          float intensity = pow(0.75 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 1.8);
          gl_FragColor = vec4(uGlowColor, intensity * 0.35);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    globeGroup.add(glow);

    const flowMaterial = createFlowMaterial();
    const flowRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.4, 0.06, 32, 92),
      flowMaterial,
    );
    flowRing.rotation.x = Math.PI / 2.4;
    globeGroup.add(flowRing);
    materialsRef.current.push(flowMaterial);

    const pulseMaterial = createPulseMaterial();
    const pulseDisc = new THREE.Mesh(
      new THREE.CircleGeometry(1.6, 48),
      pulseMaterial,
    );
    pulseDisc.rotation.x = Math.PI / 2;
    pulseDisc.position.y = -1.35;
    globeGroup.add(pulseDisc);
    materialsRef.current.push(pulseMaterial);

    const haloMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color("#0FFFF5") },
        uTime: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uTime;
        varying vec3 vNormal;

        void main() {
          float edgeGlow = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.5);
          float pulse = sin(uTime * 1.5) * 0.25 + 0.35;
          gl_FragColor = vec4(uColor, edgeGlow * pulse);
        }
      `,
    });
    const halo = new THREE.Mesh(new THREE.SphereGeometry(2.6, 42, 42), haloMaterial);
    globeGroup.add(halo);
    materialsRef.current.push(haloMaterial);

    const pointsGeometry = new THREE.BufferGeometry();
    const points = [];
    const colors = [];
    const color = new THREE.Color();

    for (let i = 0; i < 240; i++) {
      const theta = Math.random() * Math.PI;
      const phi = Math.random() * TAU;
      const radius = 2.25;
      const x = radius * Math.sin(theta) * Math.cos(phi);
      const y = radius * Math.cos(theta);
      const z = radius * Math.sin(theta) * Math.sin(phi);
      points.push(x, y, z);

      color.setHSL(0.5 + Math.random() * 0.2, 0.9, 0.55);
      colors.push(color.r, color.g, color.b);
    }

    pointsGeometry.setAttribute("position", new THREE.Float32BufferAttribute(points, 3));
    pointsGeometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const pointsMaterial = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const networkPoints = new THREE.Points(pointsGeometry, pointsMaterial);
    globeGroup.add(networkPoints);

    const orbitGroup = new THREE.Group();
    group.add(orbitGroup);
    const orbitMaterial = new THREE.LineBasicMaterial({
      color: "#14B8A6",
      transparent: true,
      opacity: 0.2,
    });

    const orbitCount = 4;
    for (let i = 0; i < orbitCount; i++) {
      const orbitGeometry = new THREE.EllipseCurve(
        0,
        0,
        2.8 + i * 0.12,
        2.8 + i * 0.08,
        0,
        TAU,
        false,
        Math.PI / 3,
      ).getPoints(220);

      const orbitPts = new THREE.BufferGeometry().setFromPoints(
        orbitGeometry.map((p) => new THREE.Vector3(p.x, p.y, 0)),
      );

      const orbit = new THREE.LineLoop(orbitPts, orbitMaterial.clone());
      orbit.rotation.x = Math.PI / 2.8 + i * 0.18;
      orbit.rotation.z = i * 0.4;
      orbitGroup.add(orbit);
    }

    const trailsGroup = new THREE.Group();
    group.add(trailsGroup);
    const trailMaterial = new THREE.LineBasicMaterial({
      color: "#0FFFF5",
      transparent: true,
      opacity: 0.45,
    });

    const createTrail = (start, end) => {
      const curve = new THREE.QuadraticBezierCurve3(
        start,
        new THREE.Vector3(0, 0, 0).add(start.clone().add(end).multiplyScalar(0.35)),
        end,
      );
      const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(60));
      const line = new THREE.Line(geometry, trailMaterial.clone());
      line.userData = { progress: Math.random() * TAU };
      trailsGroup.add(line);
    };

    const samplePositions = pointsGeometry.attributes.position.array;
    for (let i = 0; i < 120; i += 12) {
      const start = new THREE.Vector3(
        samplePositions[i],
        samplePositions[i + 1],
        samplePositions[i + 2],
      );
      const endIndex = (i + 90) % samplePositions.length;
      const end = new THREE.Vector3(
        samplePositions[endIndex],
        samplePositions[endIndex + 1],
        samplePositions[endIndex + 2],
      );
      createTrail(start, end);
    }

    const pointer = new THREE.Vector2(0, 0);
    const targetRotation = { x: -0.15, y: 0.2 };
    const currentRotation = { x: targetRotation.x, y: targetRotation.y };

    const handlePointerMove = (event) => {
      const bounds = container.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      pointer.set(x * 2 - 1, -(y * 2 - 1));
    };

    if (enablePointer) {
      window.addEventListener("pointermove", handlePointerMove);
    }

    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      globeGroup.rotation.y += 0.0036;
      globeGroup.rotation.x = THREE.MathUtils.lerp(
        globeGroup.rotation.x,
        currentRotation.x,
        0.08,
      );

      targetRotation.x = pointer.y * 0.25 - 0.1;
      targetRotation.y = pointer.x * 0.35 + 0.3;
      currentRotation.x = THREE.MathUtils.lerp(currentRotation.x, targetRotation.x, 0.05);
      currentRotation.y = THREE.MathUtils.lerp(currentRotation.y, targetRotation.y, 0.05);

      group.rotation.y += 0.0009;

      materialsRef.current.forEach((material) => {
        if (material.uniforms?.uTime) {
          material.uniforms.uTime.value = elapsed;
        }
      });

      trailsGroup.children.forEach((trail) => {
        const progress = (trail.userData.progress += 0.012);
        const intensity = 0.12 + 0.22 * (Math.sin(progress) * 0.5 + 0.5);
        trail.material.opacity = intensity;
      });

      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

      camera.aspect = newWidth / newHeight || 1;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      animationRef.current && cancelAnimationFrame(animationRef.current);
      resizeObserver.disconnect();
      if (enablePointer) {
        window.removeEventListener("pointermove", handlePointerMove);
      }
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach((mat) => mat.dispose?.());
          } else {
            object.material.dispose?.();
          }
        }
      });
    };
  }, [enablePointer, performanceMode]);

  if (performanceMode) {
    return (
      <div
        ref={containerRef}
        className={className ? `tech-globe ${className}` : "tech-globe"}
      >
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 px-6 py-16 text-center">
          <div className="h-16 w-16 rounded-full border border-cyan-400/40 bg-cyan-400/10" />
          <h3 className="text-lg font-semibold text-cyan-100">
            Intelligent Operations Overview
          </h3>
          <p className="text-sm text-slate-300/80">
            Interactive 3D visuals are paused on this device to keep things fast and
            responsive. You still get the same insights without the extra motion.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={className ? `tech-globe ${className}` : "tech-globe"}
    />
  );
};

export default TechGlobe;

