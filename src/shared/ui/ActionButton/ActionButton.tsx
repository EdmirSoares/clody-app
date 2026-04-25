import React from 'react';
import { Text, StyleSheet, StyleProp, ViewStyle, TextStyle, View, Pressable } from 'react-native';
import { ShadowView } from 'react-native-inner-shadow';
import { useTheme } from '../../hooks/useTheme';
import { useFontScale } from '../../hooks/useFontScale';

interface ActionButtonProps {
  title: string;
  variant?: 'primary' | 'secondary';
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const ActionButton = ({
  title,
  variant = 'primary',
  onPress,
  style,
  textStyle,
}: ActionButtonProps) => {
  const { colors } = useTheme();
  const { fontSize } = useFontScale();
  const isPrimary = variant === 'primary';

  const backgroundColor = isPrimary ? colors.buttonPrimaryBackground : colors.buttonSecondaryBackground;
  const textColor = isPrimary ? colors.textButtonPrimary : colors.textButtonSecondary;
  const darkShadowColor = isPrimary ? colors.insetDarkButtonPrimary : colors.insetDarkButtonSecondary;
  const lightShadowColor = isPrimary ? colors.insetLightButtonPrimary : colors.insetLightButtonSecondary;
  const outerShadowColor = isPrimary ? colors.shadowButtonPrimary : colors.shadowButtonSecondary;

  const darkShadowOffset = { width: -4, height: -4 };
  const lightShadowOffset = { width: 4, height: 4 };

  return (
    <Pressable onPress={onPress}>
      <View style={[
        styles.outerWrapper,
        isPrimary ? styles.primaryOuterShadow : styles.secondaryOuterShadow,
        { shadowColor: outerShadowColor },
        style,
      ]}>
        <ShadowView
          inset={true}
          backgroundColor="#fff"
          shadowColor={darkShadowColor}
          shadowOffset={darkShadowOffset}
          shadowBlur={6}
          isReflectedLightEnabled={false}
          style={[styles.baseContainer, { mixBlendMode: 'multiply' }]}
        >
          <ShadowView
            inset={true}
            backgroundColor={backgroundColor}
            shadowColor={lightShadowColor}
            shadowOffset={lightShadowOffset}
            shadowBlur={10}
            isReflectedLightEnabled={false}
            style={styles.baseContainer}
          >
            <Text style={[styles.baseText, { color: textColor, fontSize: fontSize['3xl'] }, textStyle]}>
              {title}
            </Text>
          </ShadowView>
        </ShadowView>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  outerWrapper: {
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  baseContainer: {
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  baseText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    textAlign: 'center',
    paddingVertical: 18,
    paddingHorizontal: 76,
  },
  primaryOuterShadow: {
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
  },
  secondaryOuterShadow: {
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 1,
    shadowRadius: 30,
    elevation: 8,
  },
});
