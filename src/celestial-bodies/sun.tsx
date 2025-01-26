import { TextureLoader } from 'three';
import { useLoader, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh, Color } from 'three';

export const Sun: React.FC = () => {
  const texture = useLoader(TextureLoader, '/textures/2k_sun.jpg');
  const sunRef = useRef<Mesh>(null);

  // Rotate the Sun slowly
  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.002; // Slow rotation
    }
  });

  return (
    <>
      {/* Sun Sphere */}
      <mesh ref={sunRef} position={[0, 0, 0]} scale={[5, 5, 5]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          emissive={new Color('#ff7700')} // Warm glow
          emissiveIntensity={5} // Intense glow
          emissiveMap={texture}
          toneMapped={false}
        />
      </mesh>

      {/* Light Emission */}
      <pointLight
        position={[0, 0, 0]} // Centered in the Sun
        intensity={20} // Bright enough for planets
        distance={1000} // Adjust light reach
        decay={50} // Realistic light falloff
        color="#ff7700" // Warm light color
        castShadow // Enable shadows
      />
    </>
  );
};
