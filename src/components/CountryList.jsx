import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import PropTypes from "prop-types";
import { useCities } from "../contexts/CitiesContext";

function CountryList() {
  const { cities, isLoading } = useCities();

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else {
      return arr;
    }
  }, []);

  if (isLoading) return <Spinner />;

  if (!countries.length)
    return <Message message="Add your first city by clicking on the map." />;
  return (
    <ul className={styles.cityList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

CountryList.propTypes = {
  cities: PropTypes.array,
  countries: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default CountryList;
