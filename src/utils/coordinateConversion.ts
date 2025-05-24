interface HorizontalCoordinates {
  altitude: number;
  azimuth: number;
}

export function equatorialToHorizontal(
  ra: number,
  dec: number,
  lat: number,
  lon: number
): HorizontalCoordinates {
  const raRad = (ra * Math.PI) / 180;
  const decRad = (dec * Math.PI) / 180;
  const latRad = (lat * Math.PI) / 180;
  const lonRad = (lon * Math.PI) / 180;

  const hourAngle = raRad - lonRad;

  const sinAlt = Math.sin(decRad) * Math.sin(latRad) +
    Math.cos(decRad) * Math.cos(latRad) * Math.cos(hourAngle);
  const altitude = Math.asin(sinAlt);

  const cosAz = (Math.sin(decRad) - Math.sin(altitude) * Math.sin(latRad)) /
    (Math.cos(altitude) * Math.cos(latRad));
  const sinAz = -Math.sin(hourAngle) * Math.cos(decRad) / Math.cos(altitude);
  let azimuth = Math.atan2(sinAz, cosAz);

  if (azimuth < 0) {
    azimuth += 2 * Math.PI;
  }

  return {
    altitude: (altitude * 180) / Math.PI,
    azimuth: (azimuth * 180) / Math.PI
  };
} 