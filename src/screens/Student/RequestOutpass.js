import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

export default function RequestOutpass() {
  const [outpassDetails, setOutpassDetails] = useState({
    name: '',
    regNo: '',
    purpose: '',
    phone: '',
  });

  const handleSubmit = () => {
    alert('Outpass Request Submitted');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request Outpass</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={outpassDetails.name}
        onChangeText={(text) => setOutpassDetails({ ...outpassDetails, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Registration No"
        value={outpassDetails.regNo}
        onChangeText={(text) => setOutpassDetails({ ...outpassDetails, regNo: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Purpose"
        value={outpassDetails.purpose}
        onChangeText={(text) => setOutpassDetails({ ...outpassDetails, purpose: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={outpassDetails.phone}
        onChangeText={(text) => setOutpassDetails({ ...outpassDetails, phone: text })}
      />
      <Button title="Submit Request" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});
