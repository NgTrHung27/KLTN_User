import { DataCountries } from "@/data/countries";

const cities = DataCountries;

export const useCities = () => {
  return cities;
};

export const useDistricts = (cityName: string) => {
  const cities = useCities();
  const singleCity = cities.filter((c) => c.Name === cityName)[0];

  if (singleCity) {
    return singleCity.Districts;
  }

  return undefined;
};

export const useWards = (cityName: string, districtName: string) => {
  const cities = useCities();
  const singleCity = cities.filter((c) => c.Name === cityName)[0];

  if (singleCity) {
    const singleDistrict = singleCity.Districts.filter(
      (d) => d.Name === districtName,
    )[0];

    if (singleDistrict) {
      return singleDistrict.Wards;
    }

    return undefined;
  }

  return undefined;
};
