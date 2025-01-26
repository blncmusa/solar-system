import { TextureLoader } from 'three';
import { useLoader, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh, Vector3 } from 'three';

export const Mercury: React.FC = () => {
  const mercuryTexture = useLoader(TextureLoader, '/textures/2k_mercury.jpg');
  const mercuryRef = useRef<Mesh>(null);

  // Sun's position
  const sunPosition = new Vector3(0, 0, 0);

  // Rotate Mercury around the Sun
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime(); // Time in seconds
    const radius = 20; // Orbit radius

    if (mercuryRef.current) {
      // Update Mercury's position (orbiting)
      mercuryRef.current.position.x = Math.sin(t) * radius;
      mercuryRef.current.position.z = Math.cos(t) * radius;

      // Make Mercury face the Sun
      mercuryRef.current.lookAt(sunPosition);
    }
  });

  return (
    <mesh ref={mercuryRef} scale={[1, 1, 1]} castShadow receiveShadow>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        map={mercuryTexture} // Mercury texture
        metalness={0.5} // Reflective surface
        roughness={0.8} // Slightly rough for realism
      />
    </mesh>
  );
};
