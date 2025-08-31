import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const RoleSelection = ({ navigation }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [scaleAnim] = useState(new Animated.Value(1)); // For button animation

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const handleNext = () => {
    if (selectedRole) {
      navigation.navigate(`${selectedRole}Dashboard`);
    } else {
      alert('Please select a role');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Role</Text>

      {['Student', 'Teacher', 'HOD', 'Warden', 'Security', 'Admin'].map((role) => (
        <Animated.View
          key={role}
          style={{ transform: [{ scale: scaleAnim }], width: '100%', alignItems: 'center' }}
        >
          <TouchableOpacity
            style={[
              styles.roleButton,
              selectedRole === role && styles.selectedButton,
            ]}
            onPress={() => setSelectedRole(role)}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>{role}</Text>
          </TouchableOpacity>
        </Animated.View>
      ))}

      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.8}
        >
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20, 
    backgroundColor: '#1a1a1a'  // Dark gray background
  },
  title: { 
    fontSize: 26, 
    marginBottom: 30, 
    fontWeight: '700', 
    color: '#FFD700', 
    letterSpacing: 1 
  },
  roleButton: { 
    paddingVertical: 15, 
    paddingHorizontal: 20,
    backgroundColor: '#333333', 
    marginVertical: 8, 
    width: 250, 
    alignItems: 'center', 
    borderRadius: 12, 
    shadowColor: '#FFD700', 
    shadowOpacity: 0.2, 
    shadowOffset: { width: 0, height: 3 }, 
    shadowRadius: 6,
    elevation: 4,
  },
  selectedButton: { 
    backgroundColor: '#FFD700', 
    shadowOpacity: 0.6, 
    shadowRadius: 10, 
    elevation: 8,
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: '600' 
  },
  nextButton: { 
    marginTop: 25, 
    paddingVertical: 15, 
    paddingHorizontal: 30, 
    backgroundColor: '#FFD700', 
    borderRadius: 12, 
    shadowColor: '#FFD700', 
    shadowOpacity: 0.5, 
    shadowOffset: { width: 0, height: 3 }, 
    shadowRadius: 6,
    elevation: 6,
  },
  nextText: { 
    color: '#1a1a1a', 
    fontSize: 18, 
    fontWeight: '700', 
    letterSpacing: 1 
  },
});

export default RoleSelection;
