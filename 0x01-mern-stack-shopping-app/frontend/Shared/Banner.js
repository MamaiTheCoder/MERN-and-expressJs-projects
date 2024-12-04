// Creates swipeable, interactive components.
// It is mainly used for building carousels, image galleries,
// or any type of horizontal or vertical list that requires swipe functionality
import { useState } from 'react';
import { Dimensions } from 'react-native'
import Swiper from 'react-native-swiper'

var { width } = Dimensions.get('window');

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);
};