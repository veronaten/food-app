import React, { useEffect, useState } from 'react';

import MealItem from './MealItem/MealItem';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('https://react-http-1a295-default-rtdb.firebaseio.com/meals.json');

      if (!response.ok) {
        throw new Error('Something went wrong..');
      };

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    }
    
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    })
  }, []);

  if (isLoading) {
    return <section>
      <p className={classes.mealIsLoading}>Loading...</p>
    </section>
  }

  if (httpError) {
    return <section className={classes.mealIsError}>
      <p>{httpError}</p>
    </section> 
  }

  const mealsList = meals.map((meal) => 
    <MealItem 
      name={meal.name} 
      description={meal.description} 
      price={meal.price} 
      key={meal.id}
      id={meal.id}
    />);

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  )  
};

export default AvailableMeals;