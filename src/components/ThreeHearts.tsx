import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { motion } from 'motion/react';

function Heart({ position, rotation, scale, speed, floatOffset, finale }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const timeOffset = useRef(Math.random() * 100);
  
  const shape = useMemo(() => {
    const x = 0, y = 0;
    const heartShape = new THREE.Shape();
    heartShape.moveTo( x + 5, y + 5 );
    heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
    heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7, x - 6, y + 7 );
    heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
    heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
    heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
    heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );
    return heartShape;
  }, []);

  const extrudeSettings = { depth: 1, bevelEnabled: true, bevelSegments: 2, steps: 1, bevelSize: 0.5, bevelThickness: 0.5 };
  
  const geometry = useMemo(() => {
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geo.computeBoundingBox();
    const box = geo.boundingBox!;
    const center = new THREE.Vector3();
    box.getCenter(center);
    geo.translate(-center.x, -center.y, -center.z);
    geo.rotateX(Math.PI);
    return geo;
  }, [shape]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() + timeOffset.current;
    
    if (finale) {
      meshRef.current.position.y += speed * 0.15; // accelerate up
      meshRef.current.position.x += Math.sin(time * 3 + floatOffset) * 0.05; // swirl
      meshRef.current.rotation.y += speed * 0.1;
      meshRef.current.rotation.z += 0.02;
    } else {
      meshRef.current.position.y += speed * 0.02;
      meshRef.current.position.x += Math.sin(time * speed + floatOffset) * 0.01;
      meshRef.current.rotation.y += speed * 0.01;
      meshRef.current.rotation.z = Math.sin(time * speed * 0.5) * 0.1;
    }
    
    if (!finale && meshRef.current.position.y > 20) {
      meshRef.current.position.y = -20;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <primitive object={geometry} attach="geometry" />
      <meshStandardMaterial 
        color="#ff1493" 
        emissive="#ff1493"
        emissiveIntensity={0.3}
        roughness={0.2} 
        metalness={0.2}
        transparent
        opacity={finale ? 0 : 0.4}
      />
    </mesh>
  );
}

export function ThreeHearts({ active = true, finale = false }) {
  const hearts = useMemo(() => {
    return Array.from({ length: 25 }).map(() => ({
      position: [
        (Math.random() - 0.5) * 30, 
        (Math.random() - 0.5) * 40, 
        (Math.random() - 0.5) * 15 - 5
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      scale: Math.random() * 0.03 + 0.015,
      speed: Math.random() * 0.5 + 0.2,
      floatOffset: Math.random() * Math.PI * 2
    }));
  }, []);

  return (
    <div className={`fixed inset-0 pointer-events-none z-[1] transition-opacity duration-[3000ms] ${active ? 'opacity-100' : 'opacity-0'}`}>
      <Canvas camera={{ position: [0, 0, 20], fov: 45 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ff00ff" />
        {hearts.map((props, i) => (
           <Heart key={i} {...props} finale={finale} />
        ))}
      </Canvas>
    </div>
  );
}
