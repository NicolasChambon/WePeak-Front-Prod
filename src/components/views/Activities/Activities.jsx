// Import necessary librairies
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// Import components
import Button from '../../utils/Button/Button';
import EventCard from '../../utils/EventCard/EventCard';
import FilterButton from './FilterButton/FilterButton';

// eslint-disable-next-line import/extensions, import/no-unresolved, import/no-absolute-path
import data from '/src/filtersData';

// Import stylesheet
import './Activities.scss';
import Calendar from './Calendar/Calendar';

const Activities = () => {
  const activityList = useSelector((state) => state.activity.activities);
  const lastSearchedCity = useSelector(
    (state) => state.activity.lastSearchedCity
  );
  const [isFilterActive, setIsFilterActive] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const handleClickOnFilter = (title) => {
    setIsFilterActive(isFilterActive === title ? null : title);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.Activities-filters')) {
        setIsFilterActive(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  return (
    <main className="Activities">
      <h1 className="Activities-title">{`Evènements à proximité de ${lastSearchedCity.name}`}</h1>
      <div className="Activities-filters">
        {data.map((item) => (
          <FilterButton
            title={item.title}
            options={item.options}
            key={item.title.value}
            onClick={() => {
              handleClickOnFilter(item.title.label);
            }}
            active={isFilterActive === item.title.label}
          />
        ))}
        <Calendar lastSearchedCity={lastSearchedCity} />
      </div>
      <div className="Activities-grid">
        {activityList.map((activity) => (
          <EventCard
            key={activity['0'].id}
            title={activity['0'].name}
            date={activity['0'].date}
            difficulty={activity['0'].difficulty}
            slug={activity['0'].id}
          />
        ))}
      </div>
      <Button text="Voir la suite" className="primary" url="#" />
    </main>
  );
};

export default Activities;