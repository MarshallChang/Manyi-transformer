import React, { useEffect } from 'react';
import { useStore } from 'renderer/store/StoreProvider';
import CanvasViewer from './CanvasViewer';

export default function SceneResult() {
  const { gltfObj } = useStore();
  useEffect(() => {
    if (gltfObj) {
      console.log(gltfObj);
    }
  }, [gltfObj]);

  return (
    <div className="w-full h-full">
      {gltfObj?.scene ? <CanvasViewer /> : <>loading</>}
    </div>
  );
}
