import { type } from "os";

export interface Star {
  name: string;
  ra: number;
  dec: number;
  magnitude: number;
}

export interface Constellation {
  name: string;
  stars: string[];
}

export const stars: Star[] = [
  {
    name: "Sirius",
    ra: 101.287,
    dec: -16.716,
    magnitude: -1.46
  },
  {
    name: "Canopus",
    ra: 95.988,
    dec: -52.696,
    magnitude: -0.74
  },
  {
    name: "Arcturus",
    ra: 213.915,
    dec: 19.182,
    magnitude: -0.05
  },
  {
    name: "Vega",
    ra: 279.235,
    dec: 38.784,
    magnitude: 0.03
  },
  {
    name: "Capella",
    ra: 79.172,
    dec: 46.007,
    magnitude: 0.08
  },
  {
    name: "Rigel",
    ra: 78.634,
    dec: -8.202,
    magnitude: 0.12
  },
  {
    name: "Procyon",
    ra: 114.825,
    dec: 5.225,
    magnitude: 0.38
  },
  {
    name: "Betelgeuse",
    ra: 88.793,
    dec: 7.407,
    magnitude: 0.42
  }
];

export const constellations: Constellation[] = [
  {
    name: "Orion",
    stars: ["Betelgeuse", "Rigel"]
  },
  {
    name: "Canis Major",
    stars: ["Sirius"]
  },
  {
    name: "Canis Minor",
    stars: ["Procyon"]
  },
  {
    name: "Auriga",
    stars: ["Capella"]
  },
  {
    name: "Lyra",
    stars: ["Vega"]
  },
  {
    name: "Boötes",
    stars: ["Arcturus"]
  },
  {
    name: "Carina",
    stars: ["Canopus"]
  }
];

function toJulianDay(date: Date): number {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const hour = date.getUTCHours();
  const minute = date.getUTCMinutes();
  const second = date.getUTCSeconds();

  let jd = day - 32075 + 1461 * (year + 4800 + Math.floor((month - 14) / 12)) / 4 + 367 * (month - 2 - Math.floor((month - 14) / 12) * 12) / 12 - 3 * Math.floor((year + 4900 + Math.floor((month - 14) / 12)) / 100) / 4;

  jd += (hour / 12 + minute / 720 + second / 43200);

  return jd;
}

function greenwichMeanSiderealTime(date: Date): number {
  const jd = toJulianDay(date);
  const j2000 = 2451545.0;
  const d = jd - j2000;
  let gmst = 280.46061837 + 360.98564736629 * d + 0.000387933 * Math.pow(d / 36525, 2) - Math.pow(d / 36525, 3) / 38710000;

  gmst = gmst % 360;
  if (gmst < 0) {
    gmst += 360;
  }

  return gmst;
}

function localSiderealTime(date: Date, longitude: number): number {
  let lst = greenwichMeanSiderealTime(date) + longitude;
  lst = lst % 360;
  if (lst < 0) {
    lst += 360;
  }
  return lst;
}

export function equatorialToHorizontal(ra: number, dec: number, latitude: number, longitude: number, date: Date): [number, number] {
  const lst = localSiderealTime(date, longitude);
  const hourAngle = lst - ra;

  const decRad = dec * Math.PI / 180;
  const hourAngleRad = hourAngle * Math.PI / 180;
  const latitudeRad = latitude * Math.PI / 180;

  const sinAlt = Math.sin(decRad) * Math.sin(latitudeRad) + Math.cos(decRad) * Math.cos(latitudeRad) * Math.cos(hourAngleRad);
  let altitude = Math.asin(sinAlt);

  const sinAz = Math.cos(decRad) * Math.sin(hourAngleRad) / Math.cos(altitude);
  const cosAz = (Math.sin(decRad) - Math.sin(altitude) * Math.sin(latitudeRad)) / (Math.cos(altitude) * Math.cos(latitudeRad));

  let azimuth = Math.atan2(sinAz, cosAz);

  azimuth = azimuth * 180 / Math.PI;
  altitude = altitude * 180 / Math.PI;

  if (azimuth < 0) {
    azimuth += 360;
  }

  return [azimuth, altitude];
}

export function horizontalToCartesian(azimuth: number, altitude: number, radius: number = 1): [number, number, number] {
  const azRad = azimuth * Math.PI / 180;
  const altRad = altitude * Math.PI / 180;

  const x = radius * Math.cos(altRad) * Math.sin(azRad);
  const y = radius * Math.sin(altRad);
  const z = radius * Math.cos(altRad) * Math.cos(azRad);

  return [x, y, -z];
}

export function equatorialToCartesian(ra: number, dec: number, radius: number = 1): [number, number, number] {
  const raRad = (ra * Math.PI) / 180;
  const decRad = (dec * Math.PI) / 180;
  
  const x = radius * Math.cos(decRad) * Math.cos(raRad);
  const y = radius * Math.cos(decRad) * Math.sin(raRad);
  const z = radius * Math.sin(decRad);
  
  return [x, y, z];
}

export const getLocalSiderealTime = (date: Date, longitude: number) => {
  const JD = (date.getTime() / 86400000) + 2440587.5;
  const T = (JD - 2451545.0) / 36525;
  const GMST = 100.46061837 + 36000.770053608 * T + 0.000387933 * T * T - T * T * T / 38710000;
  const LST = (GMST + longitude) % 360;
  return LST;
}; 