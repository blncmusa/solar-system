import { TextureLoader } from 'three';
import { useLoader, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh, Color } from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { PerspectiveCamera } from 'three';

interface SunProps {
  resetFocus: () => void;
}

export const Sun: React.FC<SunProps> = ({ resetFocus }) => {
  const texture = useLoader(TextureLoader, '/textures/2k_sun.jpg');
  const sunRef = useRef<Mesh>(null);
  const { camera, controls } = useThree() as {
    camera: PerspectiveCamera;
    controls: OrbitControlsImpl;
  };

  const handleClick = () => {
    resetFocus(); // Reset the focus state
    if (controls) {
      camera.position.set(0, 0, 50);
      controls.target.set(0, 0, 0);
      controls.update();
    }
  };

  return (
    <mesh ref={sunRef} position={[0, 0, 0]} scale={[5, 5, 5]} onClick={handleClick}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        map={texture}
        emissive={new Color('#ff7700')}
        emissiveIntensity={5}
        emissiveMap={texture}
        toneMapped={false}
      />
      <pointLight
        position={[0, 0, 0]}
        intensity={20}
        distance={1000}
        decay={50}
        color="#ff7700"
        castShadow
      />
    </mesh>
  );
};
