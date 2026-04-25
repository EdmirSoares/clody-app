import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { ShadowView } from 'react-native-inner-shadow';
import { CircularIcon } from '../CircularIconButton';
import { useTheme } from '../../hooks/useTheme';
import { useFontScale } from '../../hooks/useFontScale';

interface WideCardProps {
  icon: ReactNode;
  iconBackgroundColor?: string;
  label: string;
  value: string;
  style?: StyleProp<ViewStyle>;
}

export const WideCard = ({ icon, iconBackgroundColor, label, value, style }: WideCardProps) => {
  const { colors } = useTheme();
  const { fontSize, lineHeight } = useFontScale();

  return (
    <View style={[styles.outerWrapper, { shadowColor: colors.shadowCard }, style]}>
      <ShadowView
        inset={true}
        backgroundColor="#fff"
        shadowColor={colors.insetDarkCard}
        shadowOffset={{ width: -8, height: -8 }}
        shadowBlur={16}
        isReflectedLightEnabled={false}
        style={[styles.shadowLayer, { mixBlendMode: 'multiply' }]}
      >
        <ShadowView
          inset={true}
          backgroundColor="rgba(255, 255, 255, 0.00)"
          shadowColor={colors.insetLightCard}
          shadowOffset={{ width: 8, height: 8 }}
          shadowBlur={16}
          isReflectedLightEnabled={false}
          style={styles.innerContent}
        >
          <CircularIcon variant="small" backgroundColor={iconBackgroundColor}>
            {icon}
          </CircularIcon>
          <View style={styles.textContainer}>
            <Text style={[styles.label, { color: colors.textSecondary, fontSize: fontSize.md, lineHeight: lineHeight.md }]}>
              {label}
            </Text>
            <Text style={[styles.value, { color: colors.textPrimary, fontSize: fontSize['3xl'], lineHeight: lineHeight['3xl'] }]}>
              {value}
            </Text>
          </View>
        </ShadowView>
      </ShadowView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerWrapper: {
    width: '100%',
    borderRadius: 48,
    shadowOffset: { width: 20, height: 20 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 8,
  },
  shadowLayer: {
    width: '100%',
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContent: {
    width: '100%',
    borderRadius: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  textContainer: {
    flexDirection: 'column',
    alignItems:'center',
    justifyContent: 'center',
    gap: 2,
    paddingVertical: 25,
  },
  label: {
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  value: {
    fontFamily: 'PlusJakartaSans_700Bold',
  },
});
