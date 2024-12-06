import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, MapPin, Star } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({ navigation, route }) {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [plannedGuides, setPlannedGuides] = useState(route.params?.plannedGuides || []);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const parsedData = JSON.parse(userData);
        setName(parsedData.name);
        setLastName(parsedData.lastName);
        setEmail(parsedData.email);
        setPhone(parsedData.phone);
        setGender(parsedData.gender);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const saveUserData = async () => {
    try {
      const userData = JSON.stringify({ name, lastName, email, phone, gender });
      await AsyncStorage.setItem('userData', userData);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const saveChanges = () => {
    saveUserData();
    setIsEditing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Settings size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: '/placeholder.svg' }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editButton} onPress={toggleEdit}>
            <Text style={styles.editButtonText}>{isEditing ? 'Cancel' : 'Edit Profile'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Name:</Text>
            {isEditing ? (
              <TextInput
                style={styles.infoInput}
                value={name}
                onChangeText={setName}
              />
            ) : (
              <Text style={styles.infoText}>{name}</Text>
            )}
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Last Name:</Text>
            {isEditing ? (
              <TextInput
                style={styles.infoInput}
                value={lastName}
                onChangeText={setLastName}
              />
            ) : (
              <Text style={styles.infoText}>{lastName}</Text>
            )}
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email:</Text>
            {isEditing ? (
              <TextInput
                style={styles.infoInput}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            ) : (
              <Text style={styles.infoText}>{email}</Text>
            )}
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phone:</Text>
            {isEditing ? (
              <TextInput
                style={styles.infoInput}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={styles.infoText}>{phone}</Text>
            )}
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Gender:</Text>
            {isEditing ? (
              <TextInput
                style={styles.infoInput}
                value={gender}
                onChangeText={setGender}
              />
            ) : (
              <Text style={styles.infoText}>{gender}</Text>
            )}
          </View>
        </View>

        {isEditing && (
          <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Places</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.placesScroll}>
            {[1, 2, 3].map((place) => (
              <View key={place} style={styles.placeCard}>
                <Image
                  source={{ uri: '/placeholder.svg' }}
                  style={styles.placeImage}
                />
                <View style={styles.placeInfo}>
                  <Text style={styles.placeName}>Place {place}</Text>
                  <View style={styles.placeLocation}>
                    <MapPin size={12} color="#666666" />
                    <Text style={styles.placeLocationText}>Location {place}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Reviews</Text>
          {[1, 2, 3].map((review) => (
            <View key={review} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <Text style={styles.reviewTitle}>Review {review}</Text>
                <View style={styles.reviewRating}>
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      color={index < 4 ? '#FFD700' : '#e5e5e5'}
                      fill={index < 4 ? '#FFD700' : '#e5e5e5'}
                    />
                  ))}
                </View>
              </View>
              <Text style={styles.reviewText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do tempor incididunt ut labore et dolore magna aliqua.</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    padding: 24,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  editButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  infoSection: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  infoText: {
    fontSize: 16,
    color: '#666666',
  },
  infoInput: {
    fontSize: 16,
    color: '#666666',
    borderBottomWidth: 1,
    borderBottomColor: '#4CAF50',
    paddingVertical: 4,
    minWidth: 150,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  placesScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  placeCard: {
    width: 160,
    marginRight: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  placeImage: {
    width: '100%',
    height: 100,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  placeInfo: {
    padding: 12,
  },
  placeName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  placeLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  placeLocationText: {
    fontSize: 12,
    color: '#666666',
  },
  reviewCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  reviewRating: {
    flexDirection: 'row',
    gap: 4,
  },
  reviewText: {
    fontSize: 14,
    color: '#666666',
  },
});

