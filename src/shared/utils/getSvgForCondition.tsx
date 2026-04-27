import SunIcon from "../assets/icons/weather/sun-icon.svg";
import WindIcon from "../assets/icons/weather/wind-icon.svg";
import CloudIcon from "../assets/icons/weather/cloud-icon.svg";
import RainIcon from "../assets/icons/weather/rain-icon.svg";
import SnowIcon from "../assets/icons/weather/snow-icon.svg";
import SunCloudIcon from "../assets/icons/weather/sun-cloud-icon.svg";

interface SvgProps {
  iconCode: string;
  color: string;
  size: number;
}

export const getSvgForCondition = ({
  iconCode,
  color,
  size,
}: SvgProps) => {
  const code = iconCode.slice(0, 2);
  switch (code) {
    case "01":
      return <SunIcon width={size} height={size} color={color} />;
    case "02":
      return <SunCloudIcon width={size} height={size} color={color} />;
    case "03":
    case "04":
      return <CloudIcon width={size} height={size} color={color} />;
    case "09":
    case "10":
    case "11":
      return <RainIcon width={size} height={size} color={color} />;
    case "13":
      return <SnowIcon width={size} height={size} color={color} />;
    case "50":
      return <WindIcon width={size} height={size} color={color} />;
    default:
      return <SunIcon width={size} height={size} color={color} />;
  }
};
