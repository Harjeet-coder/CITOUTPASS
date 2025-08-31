import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { useOutpass } from '../../context/OutpassContext';
import { colors } from '../../styles/theme';

export default function TeacherDashboard() {
  const { requests, updateRequestStatus } = useOutpass(); // Get update function from context

  const handleApprove = (id) => {
    updateRequestStatus(id, "Approved by Teacher", "HOD");
    alert(`Outpass request ${id} approved. Sent to HOD.`);
  };

  const handleReject = (id) => {
    updateRequestStatus(id, "Rejected by Teacher", null);
    alert(`Outpass request ${id} rejected.`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Teacher Dashboard</Text>

      {requests.length === 0 ? (
        <Text style={styles.noRequestsText}>No requests yet.</Text>
      ) : (
        requests.map((request) => (
          <Card key={request.id} style={styles.card}>
            <Card.Title
              title={`Outpass Request from ${request.name}`}
              titleStyle={styles.cardTitle}
            />
            <Card.Content>
              <Text style={styles.cardText}><Text style={styles.label}>Reg No:</Text> {request.regNo}</Text>
              <Text style={styles.cardText}><Text style={styles.label}>Purpose:</Text> {request.purpose}</Text>
              <Text style={styles.cardText}><Text style={styles.label}>Day Out:</Text> {request.dayOut}</Text>
              <Text style={styles.cardText}><Text style={styles.label}>Day In:</Text> {request.dayIn}</Text>
              <Text style={styles.cardText}><Text style={styles.label}>Phone:</Text> {request.phone}</Text>
              <Text style={styles.cardText}><Text style={styles.label}>Parent's Phone:</Text> {request.parentPhone}</Text>
              <Text style={styles.cardText}><Text style={styles.label}>Status:</Text> {request.status}</Text>
            </Card.Content>
            <Card.Actions>
              <Button
                mode="contained"
                style={styles.approveButton}
                labelStyle={styles.buttonText}
                onPress={() => handleApprove(request.id)}
              >
                Approve
              </Button>
              <Button
                mode="contained"
                style={styles.rejectButton}
                labelStyle={styles.buttonText}
                onPress={() => handleReject(request.id)}
              >
                Reject
              </Button>
            </Card.Actions>
          </Card>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.primary,
    marginBottom: 20,
  },
  card: {
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 12,
    elevation: 0,
    shadowColor: 'transparent',
  },
  cardTitle: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardText: {
    color: '#FFD700',
    fontSize: 16,
    marginVertical: 2,
  },
  label: {
    fontWeight: 'bold',
    color: '#FFD700',
  },
  approveButton: {
    backgroundColor: colors.primary,
    marginRight: 10,
    borderRadius: 8,
  },
  rejectButton: {
    backgroundColor: '#f44336',
    borderRadius: 8,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  noRequestsText: {
    textAlign: 'center',
    fontSize: 18,
    color: colors.primary,
  },
});
