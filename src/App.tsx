import './App.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Sun } from './celestial-bodies/sun';
import { Stars } from './celestial-bodies/stars';
import { Mercury } from './celestial-bodies/mercury';

function App() {
  return (
    <Canvas shadows camera={{ position: [0, 0, 30], fov: 50 }}>
      {/* Camera Controls */}
      <OrbitControls
        enableZoom={true}
        minDistance={10} // Prevent zooming too close
        maxDistance={100} // Prevent zooming too far
      />

      {/* Starry Background */}
      <Stars />

      {/* Sun as Light Source */}
      <Sun />

      {/* Mercury */}
      <Mercury />
    </Canvas>
  );
}

export default App;
