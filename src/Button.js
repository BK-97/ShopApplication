// Button.js
import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';

const CustomButton = ({ onPress, iconSource, style }) => (
  <TouchableOpacity onPress={onPress} style={style}>
    <Image source={iconSource} style={{ width: '100%', height: '100%' }} />
  </TouchableOpacity>
);

CustomButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  iconSource: PropTypes.number.isRequired,
  style: PropTypes.object,
};

export default CustomButton;
