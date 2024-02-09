import countries from 'world-countries';

const formattedCountries = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    latlng: country.latlng,
    region: country.region,
    langages: country.languages
}));

const useCountries = () => {
    const getAll = () => formattedCountries;

    const getByValue = (value: string) => {
        return formattedCountries.find((item) => item.value === value);
    };

    const getLanguages = () => {
        return formattedCountries.map((item) => item.langages)
    }

    return {
        getAll,
        getByValue,
        getLanguages,
    }
};

export default useCountries;