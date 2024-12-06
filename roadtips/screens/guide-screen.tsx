import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Star, MapPin, Clock, DollarSign } from 'lucide-react-native';

export default function GuideScreen({ navigation, route }) {
  const { guide } = route.params;
  const [isPlanned, setIsPlanned] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState('');
  const [reviews, setReviews] = useState([]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Image
          source={{ uri: guide.image }}
          style={styles.coverImage}
        />
        
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={24} color="#ffffff" />
        </TouchableOpacity>

        <View style={styles.details}>
          <Text style={styles.title}>{guide.title}</Text>
          
          <View style={styles.ratingContainer}>
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                size={20}
                color={index < guide.rating ? '#FFD700' : '#e5e5e5'}
                fill={index < guide.rating ? '#FFD700' : '#e5e5e5'}
              />
            ))}
            <Text style={styles.ratingText}>{guide.rating}/5</Text>
          </View>

          <View style={styles.categoriesContainer}>
            {guide.categories.map((category) => (
              <View key={category} style={styles.categoryTag}>
                <Text style={styles.categoryText}>{category}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.description}>{guide.description}</Text>

          <View style={styles.infoSection}>
            <View style={styles.infoItem}>
              <MapPin size={20} color="#4CAF50" />
              <Text style={styles.infoText}>Location details</Text>
            </View>
            <View style={styles.infoItem}>
              <Clock size={20} color="#4CAF50" />
              <Text style={styles.infoText}>Best time to visit</Text>
            </View>
            <View style={styles.infoItem}>
              <DollarSign size={20} color="#4CAF50" />
              <Text style={styles.infoText}>Price range</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.sectionText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            {reviews.map((review, index) => (
              <View key={index} style={styles.reviewItem}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewAuthor}>{review.author}</Text>
                  <View style={styles.ratingContainer}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        color={i < review.rating ? '#FFD700' : '#e5e5e5'}
                        fill={i < review.rating ? '#FFD700' : '#e5e5e5'}
                      />
                    ))}
                  </View>
                </View>
                <Text style={styles.reviewText}>{review.text}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Write a Review</Text>
            <View style={styles.ratingContainer}>
              {[...Array(5)].map((_, index) => (
                <TouchableOpacity key={index} onPress={() => setUserRating(index + 1)}>
                  <Star
                    size={24}
                    color={index < userRating ? '#FFD700' : '#e5e5e5'}
                    fill={index < userRating ? '#FFD700' : '#e5e5e5'}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              style={styles.reviewInput}
              multiline
              numberOfLines={4}
              value={userReview}
              onChangeText={setUserReview}
              placeholder="Write your review here..."
            />
            <TouchableOpacity 
              style={styles.submitReviewButton}
              onPress={() => {
                if (userRating > 0 && userReview.trim() !== '') {
                  setReviews([...reviews, { author: 'You', rating: userRating, text: userReview }]);
                  setUserRating(0);
                  setUserReview('');
                }
              }}
            >
              <Text style={styles.submitReviewButtonText}>Submit Review</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={[styles.button, isPlanned && styles.buttonPlanned]}
            onPress={() => setIsPlanned(!isPlanned)}
          >
            <Text style={[styles.buttonText, isPlanned && styles.buttonTextPlanned]}>
              {isPlanned ? 'Remove from Plan' : 'Plan Your Visit'}
            </Text>
          </TouchableOpacity>
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
  content: {
    flex: 1,
  },
  coverImage: {
    width: '100%',
    height: 300,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 16,
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#666666',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  categoryTag: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  description: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
    marginBottom: 24,
  },
  infoSection: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#333333',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonPlanned: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  buttonTextPlanned: {
    color: '#4CAF50',
  },
  reviewItem: {
    marginBottom: 16,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewText: {
    fontSize: 14,
    color: '#666666',
  },
  reviewInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    marginBottom: 16,
  },
  submitReviewButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitReviewButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

