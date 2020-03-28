import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {TextInput, Text, View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  inputBox: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 16,
    marginVertical: 10,
  },
});

//creating prototypes to attach to input text for Sign up component
const propTypes = {
  mapElement: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  onChangeText: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  keyboardType: PropTypes.func,
  secureTextEntry: PropTypes.bool,
  label: PropTypes.string,
};

const defaultProps = {
  mapElement: n => {},
  onSubmitEditing: () => {},
  onChangeText: () => {},
  value: '',
  placeholder: '',
  maxLength: 200,
  secureTextEntry: false,
  label: '',
};

class InputText extends Component {
  render() {
    const {
      mapElement,
      onSubmitEditing,
      onChangeText,
      value,
      placeholder,
      maxLength,
      secureTextEntry,
      label,
    } = this.props;
    return (
      <View>
        <TextInput
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          maxLength={maxLength}
          returnKeyType="next"
          value={value}
          onSubmitEditing={onSubmitEditing}
          onChangeText={onChangeText}
          style={styles.inputBox}
        />
      </View>
    );
  }
}

InputText.defaultProps = defaultProps;

InputText.propTypes = propTypes;

export default InputText;
