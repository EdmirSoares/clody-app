import React, { ReactNode } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { ShadowView } from 'react-native-inner-shadow';
import { useTheme } from '../../hooks/useTheme';

interface CircularIconProps {
  children?: ReactNode;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
  variant: 'small' | 'medium' | 'large';
}

export const CircularIcon = ({
  children,
  backgroundColor,
  style,
  variant,
}: CircularIconProps) => {
  const { colors } = useTheme();
  const bg = backgroundColor ?? colors.iconBlueBackground;

  const darkShadowColor = colors.insetDarkCircle;
  const darkShadowOffset = { width: -4, height: -4 };

  const lightShadowColor = colors.insetLightCircle;
  const lightShadowOffset = { width: 4, height: 4 };

  return (
    <View style={[styles.outerWrapper, styles[variant], { shadowColor: colors.shadowCircle }, style]}>
      <ShadowView
        inset={true}
        backgroundColor="#fff"
        shadowColor={darkShadowColor}
        shadowOffset={darkShadowOffset}
        shadowBlur={2}
        isReflectedLightEnabled={false}
        style={[styles.shadowLayer, { mixBlendMode: 'multiply' }]}
      >
        <ShadowView
          inset={true}
          backgroundColor={bg}
          shadowColor={lightShadowColor}
          shadowOffset={lightShadowOffset}
          shadowBlur={4}
          isReflectedLightEnabled={false}
          style={styles.shadowLayer}
        >
          {children}
        </ShadowView>
      </ShadowView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerWrapper: {
    borderRadius: 9999,
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 5,
  },
  small: {
    width: 48,
    height: 48,
    aspectRatio: 1,
  },
  medium: {
    width: 64,
    height: 64,
    aspectRatio: 1,
  },
  large: {
    width: 80,
    height: 80,
    aspectRatio: 1,
  },
  shadowLayer: {
    width: '100%',
    height: '100%',
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
