import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useOutpass } from '../../context/OutpassContext';

export default function AdminDashboard() {
  const { requests } = useOutpass();

  return (
    <LinearGradient colors={['#000000', '#1a1a1a']} style={styles.gradient}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Admin Dashboard</Text>

        {requests.length === 0 ? (
          <Text style={styles.emptyText}>No requests available</Text>
        ) : (
          requests.map((req) => (
            <Card key={req.id} style={styles.card}>
              <Card.Title
                title={req.name}
                subtitle={`Reg: ${req.regNo}`}
                titleStyle={styles.cardTitle}
                subtitleStyle={styles.cardSubtitle}
              />
              <Card.Content>
                <Text style={styles.cardText}>Status: {req.status}</Text>
                <Text style={styles.cardText}>Last Approved By: {req.lastApprovedBy}</Text>
              </Card.Content>
            </Card>
          ))
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
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
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 16,
    marginBottom: 15,
    elevation: 8,
    shadowColor: '#FFD700',
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  cardTitle: {
    color: '#FFD700',
    fontWeight: '700',
    fontSize: 18,
  },
  cardSubtitle: {
    color: '#d4af37',
    fontSize: 14,
  },
  cardText: {
    color: '#FFD700',
    fontSize: 15,
    marginTop: 4,
  },
});
