import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';

export const Stars: React.FC = () => {
  // Load star texture
  const starTexture = useLoader(TextureLoader, '/textures/2k_stars.jpg');

  return (
    <mesh scale={[-250, -250, -250]} position={[0, 0, 0]}>
      {/* Large Inverted Sphere for Stars */}
      <sphereGeometry args={[1, 64, 64]} />
      <meshBasicMaterial
        map={starTexture}
        side={2} // Double-sided to render inside the sphere
        transparent={true}
        opacity={1} // Fully visible
      />
    </mesh>
  );
};
