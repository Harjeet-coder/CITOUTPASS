import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { TextInput, Button, Card, Provider as PaperProvider } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useOutpass } from '../../context/OutpassContext';

export default function StudentDashboard() {
  const [form, setForm] = useState({
    name: '',
    regNo: '',
    dayOut: '',
    dayIn: '',
    purpose: '',
    phone: '',
    parentPhone: '',
  });

  const { addRequest, updateRequestStatus } = useOutpass();

  const handleSubmit = () => {
    if (Object.values(form).includes('')) {
      Alert.alert('All fields must be filled!');
      return;
    }

    const newRequest = {
      id: Date.now(),
      ...form,
      status: 'Pending',
      lastApprovedBy: 'Student',
      nextApprover: 'Teacher',
    };

    addRequest(newRequest);
    updateRequestStatus(newRequest.id, 'Pending');
    Alert.alert('Request Submitted to Teacher!');

    setForm({ name: '', regNo: '', dayOut: '', dayIn: '', purpose: '', phone: '', parentPhone: '' });
  };

  return (
    <PaperProvider theme={customTheme}>
      <LinearGradient colors={['#1e1e1e', '#2c2c2c']} style={styles.gradient}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={80}
        >
          <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
            <Animatable.View animation="fadeInUp" duration={800} style={{ width: '100%' }}>
              <Card style={styles.card}>
                <Card.Title title="Outpass Request" titleStyle={styles.title} />
                <Card.Content style={styles.formContainer}>
                  {['name', 'regNo', 'dayOut', 'dayIn', 'purpose', 'phone', 'parentPhone'].map((field) => (
                    <View key={field} style={styles.inputContainer}>
                      <TextInput
                        label={field.toUpperCase()}
                        value={form[field]}
                        onChangeText={(val) => setForm({ ...form, [field]: val })}
                        style={styles.input}
                        mode="outlined"
                        outlineColor={colors.primary}
                        activeOutlineColor={colors.primary}
                        textColor={colors.primary}
                        dense
                        theme={{
                          colors: {
                            text: colors.primary,
                            placeholder: '#bfbfbf',
                          },
                          roundness: 10,
                        }}
                      />
                    </View>
                  ))}

                  <Animatable.View animation="pulse" iterationCount="infinite" easing="ease-out">
                    <LinearGradient colors={['#FFD700', '#ffcc00']} style={styles.buttonGradient}>
                      <Button
                        mode="contained"
                        onPress={handleSubmit}
                        style={styles.button}
                        labelStyle={styles.buttonText}
                        contentStyle={{ height: 50 }}
                      >
                        Submit Request
                      </Button>
                    </LinearGradient>
                  </Animatable.View>
                </Card.Content>
              </Card>
            </Animatable.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </PaperProvider>
  );
}

const colors = {
  primary: '#FFD700',
  background: '#1e1e1e',
  text: '#FFD700',
};

const customTheme = {
  colors: {
    primary: colors.primary,
    background: colors.background,
    text: colors.text,
    placeholder: '#FFD700',
  },
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    color: '#FFD700',
    marginBottom: 10,
  },
  card: {
  backgroundColor: 'rgba(255, 255, 255, 0.06)',
  borderRadius: 18,
  padding: 12,
  elevation: 0,  // Removes Android shadow
  shadowColor: 'transparent', // Removes iOS shadow
  shadowOpacity: 0,
  shadowOffset: { width: 0, height: 0 },
  shadowRadius: 0,
},

  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    borderRadius: 12,
    paddingVertical: 8,
    fontSize: 15,
  },
  buttonGradient: {
    borderRadius: 12,
    marginTop: 20,
    width: '100%',
  },
  button: {
    borderRadius: 12,
    backgroundColor: 'transparent',
    elevation: 4,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
  },
});
