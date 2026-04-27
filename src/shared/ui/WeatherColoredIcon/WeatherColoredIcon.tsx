

import SunIcon from '../../../shared/assets/icons/weather/sun-icon.svg';
import SunCloudIcon from '../../../shared/assets/icons/weather/sun-cloud-icon.svg';
import CloudIcon from '../../../shared/assets/icons/weather/cloud-icon.svg';
import RainIcon from '../../../shared/assets/icons/weather/rain-icon.svg';
import SnowIcon from '../../../shared/assets/icons/weather/snow-icon.svg';
import WindIcon from '../../../shared/assets/icons/weather/wind-icon.svg';
import ThunderstormIcon from '../../../shared/assets/icons/weather/Thunderstorm.svg';
import { getLocalColoredIconMapping } from '@shared/utils/getLocalIconMapping';

export const WeatherColoredIcon = ({ iconCode, size = 24 }: { iconCode: string, size?: number}) => {
  const meta = getLocalColoredIconMapping(iconCode);
  switch (meta.type) {
    case 'sun': return <SunIcon width={size} height={size} color={meta.fg} />;
    case 'sunCloud': return <SunCloudIcon width={size} height={size} color={meta.fg} />;
    case 'cloud': return <CloudIcon width={size} height={size} color={meta.fg} />;
    case 'rain': return <RainIcon width={size} height={size} color={meta.fg} />;
    case 'thunderstorm': return <ThunderstormIcon width={size} height={size} color={meta.fg} />;
    case 'snow': return <SnowIcon width={size} height={size} color={meta.fg} />;
    case 'wind': return <WindIcon width={size} height={size} color={meta.fg} />;
    default: return <SunIcon width={size} height={size} color={meta.fg} />;
  }
};