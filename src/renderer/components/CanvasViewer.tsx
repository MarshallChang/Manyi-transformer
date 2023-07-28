import { OrbitControls, Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react';
import { Perf } from 'r3f-perf';
import { useStore } from 'renderer/store/StoreProvider';

export default function CanvasViewer() {
  const { gltfObj } = useStore();

  return (
    <Canvas
      gl={{ preserveDrawingBuffer: true }}
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 150], fov: 50 }}
    >
      <ambientLight intensity={0.25} />
      <Suspense fallback={null}>
        <Stage
          preset="soft"
          intensity={1}
          shadows={{
            type: 'accumulative',
            color: 'skyblue',
            colorBlend: 2,
            opacity: 1,
          }}
          adjustCamera
          environment="apartment"
        >
          <primitive object={gltfObj?.scene!} />
        </Stage>
      </Suspense>
      <OrbitControls makeDefault />
      <Perf />
    </Canvas>
  );
}
