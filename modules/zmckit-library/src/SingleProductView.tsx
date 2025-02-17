import React, { useEffect } from 'react';
import { View, StyleSheet, DeviceEventEmitter } from 'react-native';
import { ZMCameraView } from './CameraViewManager'; // Import your ZMCameraView native component

interface SingleProductViewProps {
  apiToken: string;
  lensId: string;
  groupId: string;
  showFrontCamera?: boolean;
  showPreview?: boolean;
  onImageCaptured?: (imageUri: string) => void;
  onLensChange?: (lensId: string) => void;
}

const SingleProductView: React.FC<SingleProductViewProps> = ({
  apiToken,
  lensId,
  groupId,
  showFrontCamera = false,
  showPreview = true,
  onImageCaptured,
  onLensChange,
}) => {

  useEffect(() => {
    // Listen for image captured event from native code
    const imageCapturedListener = DeviceEventEmitter.addListener('onImageCaptured', (event: { imageUri: string }) => {
      if (onImageCaptured) {
        onImageCaptured(event.imageUri);
      }
    });

    // Listen for lens change event from native code
    const lensChangeListener = DeviceEventEmitter.addListener('onLensChange', (event: { lensId: string }) => {
      if (onLensChange) {
        onLensChange(event.lensId);
      }
    });

    // Cleanup listeners on component unmount
    return () => {
      imageCapturedListener.remove();
      lensChangeListener.remove();
    };
  }, [onImageCaptured, onLensChange]);

  return (
    <View style={styles.container}>
      <ZMCameraView
        style={styles.cameraView}
        singleLens={true}
        apiToken={apiToken}
        lensId={lensId}
        groupId={groupId}
        showFrontCamera={showFrontCamera}
        showPreview={showPreview}
        onImageCaptured={onImageCaptured}
        onLensChange={onLensChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraView: {
    flex: 1,
  },
});

export default SingleProductView;
