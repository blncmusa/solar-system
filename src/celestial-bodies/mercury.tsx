import { TextureLoader } from 'three';
import { useLoader, useFrame, useThree } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import { Mesh, Color, Vector3, PerspectiveCamera } from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

interface MercuryProps {
  isPaused: boolean;
  isFocused: boolean;
  resetFocus: () => void;
}

export const Mercury: React.FC<MercuryProps> = ({ isPaused, isFocused, resetFocus }) => {
  const mercuryTexture = useLoader(TextureLoader, '/textures/2k_mercury.jpg');
  const mercuryRef = useRef<Mesh>(null);
  const { camera, controls } = useThree() as {
    camera: PerspectiveCamera;
    controls: OrbitControlsImpl;
  };

  const sunPosition = new Vector3(0, 0, 0);
  const timeRef = useRef(0);

  useFrame(({ clock }, delta) => {
    const orbitRadius = 20; // Mercury's orbit radius
    const rotationSpeed = 0.01; // Spin speed
    const orbitalSpeed = 0.5; // Orbit speed

    if (mercuryRef.current) {
      // Update Mercury's rotation (always spins)
      mercuryRef.current.rotation.y += rotationSpeed;

      // Update Mercury's orbit when unpaused
      if (!isPaused) {
        timeRef.current += delta * orbitalSpeed;
        const t = timeRef.current;
        mercuryRef.current.position.x = Math.sin(t) * orbitRadius;
        mercuryRef.current.position.z = Math.cos(t) * orbitRadius;
      }

      if (isFocused) {
        const mercuryPosition = mercuryRef.current.position.clone();

        // Update OrbitControls target only (so you can still manually rotate/zoom)
        controls.target.lerp(mercuryPosition, 0.1); // Smoothly follow Mercury's position
        controls.update(); // Allow OrbitControls to manage camera position
      }
    }
  });

  const handleClick = () => {
    resetFocus(); // Reset focus for other objects

    if (mercuryRef.current) {
      const mercuryPosition = mercuryRef.current.position.clone();

      // Set the target to Mercury
      controls.target.copy(mercuryPosition);
      controls.update();
    }
  };

  return (
    <mesh
      ref={mercuryRef}
      scale={[1, 1, 1]}
      castShadow
      receiveShadow
      onClick={handleClick}
    >
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        map={mercuryTexture}
        emissive={new Color('#888888')}
        emissiveIntensity={0.5}
        emissiveMap={mercuryTexture}
        metalness={0.3}
        roughness={0.9}
      />
    </mesh>
  );
};
