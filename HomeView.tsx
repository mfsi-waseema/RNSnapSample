import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

// Ensure correct imports
import { SingleProductView, GroupProductView } from 'react-native-zmckit-library';

// Sample values for the API token, lens ID, and group ID
const apiToken =
  "eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzMxOTMxMTYxLCJzdWIiOiJiY2JjYWZiYi1jMzQzLTQwZjYtYTEzMS0zMTQyNDg5MzRmMjB-U1RBR0lOR35hZjliZGRjOC04Y2IwLTRkMzQtOTZlZS1jNWNjYWQ0NGNlMzcifQ.ZNRJ5hmUI6titUTZLEi_A9jd8tKwyDQoBqG-w0ef3AU";
const lensId = "800d250a-9c6f-4344-a071-e09a811e8769";
const groupId = "5492a049-1f90-46cb-bbdb-082092ec55e9";

const HomeView = () => {
  const [single, setSingle] = useState(false);
  const [group, setGroup] = useState(false);

  // Callback when an image is captured
  const handleImageCaptured = (imageUri: string) => {
    Alert.alert("Image Captured", `Image URI: ${imageUri}`);
    console.log("Image captured:", imageUri);
  };

  // Callback when a lens is changed
  const handleLensChange = (lensId: string) => {
    Alert.alert("Lens Changed", `New Lens ID: ${lensId}`);
    console.log("Lens changed to:", lensId);
  };

  const handleSingleProduct = () => {
    setSingle(true);
    setGroup(false); // Ensure group is hidden when single is active
  };

  const handleGroupProduct = () => {
    setGroup(true);
    setSingle(false); // Ensure single is hidden when group is active
  };

  return (
    <View style={styles.container}>
      {/* Content area */}
      <View style={styles.content}>
        {single && (
          <SingleProductView
            apiToken={apiToken}
            lensId={lensId}
            groupId={groupId}
            onImageCaptured={handleImageCaptured} // Pass the image capture callback
            onLensChange={handleLensChange} // Pass the lens change callback
          />
        )}
        {group && (
          <GroupProductView
            apiToken={apiToken}
            groupId={groupId}
            onImageCaptured={handleImageCaptured} // Pass the image capture callback
            onLensChange={handleLensChange} // Pass the lens change callback
          />
        )}
      </View>

      {/* Bottom Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: single ? '#cccccc' : '#007bff' }, // Disabled color if active
          ]}
          onPress={handleSingleProduct}
          disabled={single} // Disable button if already active
        >
          <Text style={styles.buttonText}>Single Product</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: group ? '#cccccc' : '#007bff' }, // Disabled color if active
          ]}
          onPress={handleGroupProduct}
          disabled={group} // Disable button if already active
        >
          <Text style={styles.buttonText}>Group Product</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeView;
