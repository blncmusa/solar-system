import './App.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Sun } from './celestial-bodies/sun';
import { Stars } from './celestial-bodies/stars';
import { Mercury } from './celestial-bodies/mercury';
import { useState, useEffect } from 'react';

function App() {
  const [isPaused, setIsPaused] = useState(false);
  const [focus, setFocus] = useState<'sun' | 'mercury'>('sun');
  const [minDistance, setMinDistance] = useState(10);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        setIsPaused((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const resetFocus = (focusTarget: 'sun' | 'mercury') => {
    setFocus(focusTarget);
    setMinDistance(focusTarget === 'sun' ? 25 : 3); // Adjust zoom limits
  };

  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 50], fov: 45 }}
    >
      <OrbitControls
        enableZoom
        enablePan
        minDistance={minDistance} // Dynamic min distance
        maxDistance={200}
        makeDefault
        dampingFactor={0.1}
        enableDamping
        rotateSpeed={0.8}
      />

      <Stars />
      <Sun resetFocus={() => resetFocus('sun')} />
      <Mercury
        isPaused={isPaused}
        isFocused={focus === 'mercury'}
        resetFocus={() => resetFocus('mercury')}
      />
    </Canvas>
  );
}

export default App;
