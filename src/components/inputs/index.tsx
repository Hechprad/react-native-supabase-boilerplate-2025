import { ReactNode, useState } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

import colors from '@/constants/theme/colors';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './styles';

type CustomTextInputProps = {
  errorMessage?: string;
  inputMode?: TextInputProps['inputMode'];
  keyboardType?: TextInputProps['keyboardType'];
  label: string;
  onBlur?: TextInputProps['onBlur'];
  onChangeText: TextInputProps['onChangeText'];
  onFocus?: TextInputProps['onFocus'];
  placeholder: TextInputProps['placeholder'];
  textContentType?: TextInputProps['textContentType'];
  value: TextInputProps['value'];
};

const MyAppTextBaseInput = (
  props: CustomTextInputProps & {
    secureTextEntry?: boolean;
    inputChildren?: ReactNode;
  },
) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <View
        style={
          props.errorMessage
            ? { ...styles.formItem, ...styles.errorBorder }
            : styles.formItem
        }
      >
        <TextInput
          onChangeText={props.onChangeText}
          value={props.value}
          placeholder={props.placeholder}
          placeholderTextColor={colors.palette.lightGray}
          onBlur={props.onBlur}
          onFocus={props.onFocus}
          keyboardType={props.keyboardType ?? 'default'}
          style={styles.input}
          secureTextEntry={props.secureTextEntry}
          inputMode={props.inputMode}
          textContentType={props.textContentType}
        />
        {props.inputChildren}
      </View>
      {props.errorMessage ? (
        <Text style={styles.errorMessage}>{props.errorMessage}</Text>
      ) : null}
    </View>
  );
};

export const MyAppTextInput = (props: CustomTextInputProps) => {
  return <MyAppTextBaseInput {...props} />;
};

export const MyAppEmailInput = (props: CustomTextInputProps) => {
  return (
    <MyAppTextBaseInput
      {...props}
      keyboardType="email-address"
      inputMode="email"
      textContentType="emailAddress"
    />
  );
};

export const MyAppPasswordInput = (
  props: CustomTextInputProps & { passwordVisible?: boolean },
) => {
  const [visible, setVisible] = useState(false);

  return MyAppTextBaseInput({
    ...props,
    secureTextEntry: !visible,
    inputChildren: (
      <Ionicons
        name={visible ? 'eye-off-outline' : 'eye-outline'}
        size={24}
        onPress={() => setVisible(!visible)}
      />
    ),
  });
};
