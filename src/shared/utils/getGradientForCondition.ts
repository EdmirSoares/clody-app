interface GradientResult {
  colors: readonly [string, string];
  isDark: boolean;
}

export const getGradientForCondition = (iconCode: string): GradientResult => {
  const isNight = iconCode.endsWith("n");
  const code = iconCode.slice(0, 2);

  if (isNight) {
    return { colors: ["#1A1F2E", "#2C3E50"], isDark: true };
  }

  switch (code) {
    case "01":
    case "02":
      return { colors: ["#FCD3A8", "#FFB88C"], isDark: false };
    case "03":
    case "04":
      return { colors: ["#768C9C", "#F7F9FB"], isDark: false };
    case "09":
    case "10":
    case "11":
      return { colors: ["#191C1E", "#5A98B2"], isDark: true };
    case "13":
      return { colors: ["#B6C7D3", "#F7F9FB"], isDark: false };
    default:
      return { colors: ["#FCD3A8", "#FFB88C"], isDark: false };
  }
};
