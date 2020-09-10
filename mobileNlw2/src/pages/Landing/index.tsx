import React from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {  RectButton } from 'react-native-gesture-handler';

import styles from './styles';

import landingImg from '../../assets/images/landing.png';
import study from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

const Landing: React.FC = () => {
  const { navigate } = useNavigation();

  function handleNavigateToGiveClassesPages() {
    navigate('giveClasses');
  }

  function handleNavigateToStudyPages() {
    navigate('Study');
  }

  return (
    <View style={styles.container}>
      <Image source={landingImg} style={styles.banner} />

      <Text style={styles.title}>
        Seja bem-vindo, {'\n'}
        <Text style={styles.titleBold}>O que deseja fazer?</Text>
      </Text>

      <View style={styles.buttonContainer}>
        <RectButton style={[styles.button, styles.buttonPrimary]} onPress={handleNavigateToStudyPages}>
          <Image source={study} />

          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>

        <RectButton style={[styles.button, styles.buttonSecondary]} onPress={handleNavigateToGiveClassesPages}>
          <Image source={giveClassesIcon} />

          <Text style={styles.buttonText}>Dar aulas</Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnections}>
        Total de 285 conexōes já realizadas! {' '}
        <Image source={heartIcon} />
      </Text>
    </View>
  );
}

export default Landing;