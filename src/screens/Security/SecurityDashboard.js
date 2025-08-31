import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useOutpass } from '../../context/OutpassContext';

export default function SecurityDashboard() {
  const { requests, updateRequestStatus } = useOutpass();
  const [pendingRequests, setPendingRequests] = useState([]);

  useEffect(() => {
    // Only requests approved by all 3 (Teacher, HOD, Warden)
    setPendingRequests(
      requests.filter((request) => request.status === 'Approved by Warden')
    );
  }, [requests]);

  const checkTimings = (dayOut, dayIn) => {
    const now = new Date();
    const outTime = new Date(dayOut);
    const inTime = new Date(dayIn);

    if (now >= outTime && now <= inTime) {
      return 'Inside Period'; // Student should be outside
    } else if (now > inTime) {
      return 'Reached'; // Student should be back
    } else {
      return 'Not Started'; // Too early to leave
    }
  };

  const handleCheck = (item) => {
    const status = checkTimings(item.dayOut, item.dayIn);

    if (status === 'Reached') {
      updateRequestStatus(item.id, 'Completed');
      alert(`Student ${item.name} has returned. Marked as Completed.`);
    } else if (status === 'Inside Period') {
      alert(`Student ${item.name} is currently outside.`);
    } else {
      alert(`Too early for ${item.name} to leave.`);
    }
  };

  const renderRequestCard = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleCheck(item)}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardText}>Reg No: {item.regNo}</Text>
      <Text style={styles.cardText}>Purpose: {item.purpose}</Text>
      <Text style={styles.cardText}>Day Out: {item.dayOut}</Text>
      <Text style={styles.cardText}>Day In: {item.dayIn}</Text>
      <Text style={styles.tapText}>Tap to Check Status</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#000000', '#1a1a1a']} style={styles.gradient}>
      <Text style={styles.title}>Security Dashboard</Text>

      {pendingRequests.length === 0 ? (
        <Text style={styles.emptyText}>No approved requests yet.</Text>
      ) : (
        <FlatList
          data={pendingRequests}
          renderItem={renderRequestCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    color: '#FFD700',
    marginBottom: 20,
  },
  emptyText: {
    color: '#FFD700',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
  list: {
    paddingBottom: 30,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    padding: 15,
    marginBottom: 15,
    borderRadius: 16,
    elevation: 0,
    shadowColor: 'transparent',
  },
  cardTitle: {
    color: '#FFD700',
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 5,
  },
  cardText: {
    color: '#FFD700',
    fontSize: 14,
    marginBottom: 2,
  },
  tapText: {
    color: '#999',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'right',
  },
});
