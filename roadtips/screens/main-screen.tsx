import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Star, User } from 'lucide-react-native';

const guides = [
  {
    id: 1,
    title: 'El Yunque',
    description: 'Visit the many stunning waterfalls in this great Tropical Forest.',
    image: '/placeholder.svg',
    rating: 5,
    categories: ['Nature', 'Outdoors'],
  },
  {
    id: 2,
    title: 'El Morro',
    description: "Whether you're interested in learning the fort's rich history, or flying kites with the kids, El Morro is the place just for you!",
    image: '/placeholder.svg',
    rating: 4,
    categories: ['History', 'Bring your kids'],
  },
  {
    id: 3,
    title: 'Flamenco Beach',
    description: 'Find out why this beach is renown worldwide!',
    image: '/placeholder.svg',
    rating: 4,
    categories: ['Outdoors'],
  },
];

export default function MainScreen({ navigation }) {
  const [suggestedGuides, setSuggestedGuides] = useState([]);
  const [plannedGuides, setPlannedGuides] = useState([]);

  useEffect(() => {
    // Fetch suggested guides (this would typically come from an API)
    setSuggestedGuides([
      {
        id: 4,
        title: 'User Suggested Place',
        description: 'This is a place suggested by a user.',
        image: '/placeholder.svg',
        rating: 0,
        categories: ['User Suggested'],
      },
      // Add more suggested guides as needed
    ]);

    // Fetch planned guides (this would typically come from an API or local storage)
    setPlannedGuides([]);
  }, []);

  const handlePlanVisit = (guide) => {
    if (plannedGuides.some(g => g.id === guide.id)) {
      setPlannedGuides(plannedGuides.filter(g => g.id !== guide.id));
    } else {
      setPlannedGuides([...plannedGuides, guide]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>RoadTips</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <User size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {[...guides, ...suggestedGuides].map((guide) => (
          <TouchableOpacity
            key={guide.id}
            style={styles.card}
            onPress={() => navigation.navigate('Guide', { guide, onPlanVisit: handlePlanVisit })}
          >
            <View style={styles.cardContent}>
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>{guide.title}</Text>
                <Text style={styles.cardDescription}>{guide.description}</Text>
                <View style={styles.ratingContainer}>
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      color={index < guide.rating ? '#FFD700' : '#e5e5e5'}
                      fill={index < guide.rating ? '#FFD700' : '#e5e5e5'}
                    />
                  ))}
                </View>
                <View style={styles.categoriesContainer}>
                  {guide.categories.map((category) => (
                    <View key={category} style={styles.categoryTag}>
                      <Text style={styles.categoryText}>{category}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <Image
                source={{ uri: guide.image }}
                style={styles.cardImage}
              />
            </View>
          </TouchableOpacity>
        ))}
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
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: 'row',
    gap: 16,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 8,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryTag: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
});

