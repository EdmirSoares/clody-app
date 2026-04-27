import { palette } from "@shared/theme/colors";

export const getLocalColoredIconMapping = (owmIconCode: string) => {
  const condition = owmIconCode.slice(0, 2);

  switch (condition) {
    case "01":
      return { type: "sun", bg: palette.softYellow, fg: palette.hardYellow };
    case "02":
      return { type: "sunCloud", bg: palette.blueWhite, fg: palette.skyBlue };
    case "03":
      return { type: "cloud", bg: palette.softGray, fg: palette.hardGray };
    case "04":
      return { type: "cloud", bg: palette.softGray, fg: palette.hardGray };
    case "09":
      return { type: "rain", bg: palette.softDarkBlue, fg: palette.hardDarkBlue };
    case "10":
      return {
        type: "rain",
        bg: palette.softDarkBlue,
        fg: palette.hardDarkBlue,
      };
    case "11":
      return {
        type: "thunderstorm",
        bg: palette.softDarkBlue,
        fg: palette.hardYellow,
      };
    case "13":
      return { type: "snow", bg: palette.softGreen, fg: palette.hardGreen };
    case "50":
      return { type: "wind", bg: palette.softGreen, fg: palette.hardGreen };
    default:
      return { type: "sun", bg: palette.blueWhite, fg: palette.skyBlue };
  }
};
