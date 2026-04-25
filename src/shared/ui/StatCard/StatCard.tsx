import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { ShadowView } from 'react-native-inner-shadow';
import { useTheme } from '../../hooks/useTheme';
import { useFontScale } from '../../hooks/useFontScale';
import { shape } from '../../theme/shape';

interface StatCardProps {
  label: string;
  icon: ReactNode;
  value: string;
  style?: StyleProp<ViewStyle>;
}

export const StatCard = ({ label, icon, value, style }: StatCardProps) => {
  const { colors } = useTheme();
  const { fontSize, lineHeight } = useFontScale();

  return (
    <ShadowView
      inset={true}
      backgroundColor={'#fff'}
      shadowColor={colors.insetLightCard}
      shadowOffset={{ width: 8, height: 8 }}
      shadowBlur={16}
      isReflectedLightEnabled={false}
      style={[styles.outerLight, style, { mixBlendMode: 'multiply' }]}
    >
      <ShadowView
        inset={true}
        backgroundColor={colors.surfaceWhite}
        shadowColor={colors.insetDarkCard}
        shadowOffset={{ width: -8, height: -8 }}
        shadowBlur={16}
        isReflectedLightEnabled={false}
        style={styles.innerDark}
      >
        <View style={styles.content}>
          <Text
            style={[
              styles.label,
              {
                color: colors.textSecondary,
                fontSize: fontSize.md,
                lineHeight: lineHeight.md,
              },
            ]}
          >
            {label}
          </Text>
          {icon}
          <Text
            style={[
              styles.value,
              {
                color: colors.textPrimary,
                fontSize: fontSize.xl,
                lineHeight: lineHeight['2xl'],
              },
            ]}
          >
            {value}
          </Text>
        </View>
      </ShadowView>
    </ShadowView>
  );
};

const styles = StyleSheet.create({
  outerLight: {
    borderRadius: shape.card,
  },
  innerDark: {
    borderRadius: shape.card,
  },
  content: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    minWidth: 90,
    minHeight: 122,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  label: {
    fontFamily: 'PlusJakartaSans_700Bold',
    textAlign: 'center',
  },
  value: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    textAlign: 'center',
  },
});
