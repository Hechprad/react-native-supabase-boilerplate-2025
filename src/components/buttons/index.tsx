import React, { useState } from 'react';
import {
  Text,
  Pressable,
  PressableProps,
  ViewStyle,
  FlexAlignType,
  ActivityIndicator,
  GestureResponderEvent,
} from 'react-native';
import { buttonStyles } from './styles';
import { Ionicons } from '@expo/vector-icons';

type StyleOverrides = {
  alignSelf?: 'auto' | FlexAlignType | undefined;
};

type CustomButtonProps = {
  onPress:
    | PressableProps['onPress']
    | ((event: GestureResponderEvent) => Promise<any>);
  text: string | undefined;
  disabled?: boolean;
};

type NavigationButtonProps = {
  onPress: PressableProps['onPress'];
  disabled?: boolean;
  arrow:
    | 'arrow-back'
    | 'arrow-back-circle'
    | 'arrow-back-circle-outline'
    | 'arrow-back-circle-sharp'
    | 'arrow-back-outline'
    | 'arrow-back-sharp'
    | 'arrow-down-circle-outline'
    | 'arrow-down-circle-sharp'
    | 'arrow-down-outline'
    | 'arrow-down-sharp'
    | 'arrow-forward'
    | 'arrow-forward-circle'
    | 'arrow-forward-circle-outline'
    | 'arrow-forward-circle-sharp'
    | 'arrow-forward-outline'
    | 'arrow-forward-sharp';
  styleOverrides?: StyleOverrides;
};

const DefaultButton = (
  props: CustomButtonProps & { isLoading?: boolean },
  style: ViewStyle,
) => {
  return (
    <Pressable
      onPress={props.onPress}
      style={props.disabled ? buttonStyles.disabled : style}
      disabled={props.disabled || (props.isLoading ?? false)}
    >
      {props.isLoading !== true && buttonStyles.actionText !== null ? (
        <Text style={buttonStyles.actionText}>{props.text}</Text>
      ) : null}
      {props.isLoading === true ? <ActivityIndicator size="large" /> : null}
    </Pressable>
  );
};

export const ActionButton = (props: CustomButtonProps) => {
  const [loading, setLoading] = useState(false);
  return DefaultButton(
    {
      ...props,
      isLoading: loading,
      onPress: async (ev) => {
        if (props.onPress) {
          setLoading(true);
          try {
            await props.onPress(ev);
          } finally {
            setLoading(false);
          }
        }
      },
    },
    buttonStyles.action,
  );
};

export const NavigationButton = (props: NavigationButtonProps) => {
  return (
    <Pressable
      onPress={props.onPress}
      style={
        props.disabled
          ? buttonStyles.backButtonDisabled
          : buttonStyles.backButton
      }
      disabled={props.disabled}
    >
      <Ionicons
        name={props.arrow}
        size={24}
        style={{
          ...buttonStyles.arrowBackIcon,
          alignSelf: props.styleOverrides?.alignSelf,
        }}
      />
    </Pressable>
  );
};
