import MoonImage from "@shared/assets/images/png/Moon.png";
import RainImage from "@shared/assets/images/png/Rain.png";
import SnowImage from "@shared/assets/images/png/Snow.png";
import SunCloudImage from "@shared/assets/images/png/Sun-Cloud.png";
import SunImage from "@shared/assets/images/png/Sun.png";
import CloudImage from "@shared/assets/images/png/Cloud.png";

export const getImageForCondition = (iconCode: string) => {
  const isNight = iconCode.endsWith("n");
  const code = iconCode.slice(0, 2);
  switch (code) {
    case "01":
      return isNight ? MoonImage : SunImage;
    case "02":
      return isNight ? MoonImage : SunCloudImage;
    case "03":
    case "04":
      return CloudImage;
    case "09":
    case "10":
    case "11":
      return RainImage;
    case "13":
      return SnowImage;
    default:
      return isNight ? MoonImage : SunImage;
  }
};
