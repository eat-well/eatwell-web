import Filters from 'components/Filters';
import LoadingPanel from 'components/LoadingPanel';
import ModalPanel from 'components/ModalPanel';
import ResultsTable from 'components/ResultsTable';
import SearchField from 'components/SearchField';
import { parseNutrients } from 'helpers/utils';
import { getFoodByName, getFoodsByNutrient, getNutrients } from 'interfaces/api/foods';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const SearchFoodByNutrient = () => {
  const { categories } = useSelector(state => state.globalState);
  const [nutrient, setNutrient] = useState();
  const [nutrients, setNutrients] = useState([]);
  const [foods, setFoods] = useState();
  const [selectedFood, setSelectedFood] = useState();
  const [selectedFoodDetails, setSelectedFoodDetails] = useState();
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [resultsTitle, setResultsTitle] = useState();

  useEffect(() => {
    (async () => {
      const nutrientList = await getNutrients(['proximates', 'vitamins', 'inorganics']);
      setNutrients(nutrientList);
    })();
  }, []);

  const formatFoods = foods =>
    foods.map(food => {
      const foodObj = food[nutrient.group][nutrient.name];
      // In some rare cases and due to some rounding calculations (from the source data)
      // the quantity of a nutrient is higher than 100 for 100g of food (eg: Simple sugar and carbohydrates)
      // In these cases we are setting 100 as the value
      const quantity = nutrient.label === 'Carbohydrate' && foodObj.quantity > 100 ? 100 : foodObj.quantity;
      return {
        name: food.foodName,
        [nutrient.label]: `${quantity} ${foodObj.unit}`,
        group: food.group,
      };
    });

  const getFoods = async () => {
    const nutrientKey = `${nutrient.group}.${nutrient.name}`;
    const foods = await getFoodsByNutrient({ nutrient: nutrientKey, filters: categories.selectedGroups });
    setResultsTitle(`${nutrient.label} per 100g of food`);
    setFoods(formatFoods(foods));
  };

  const handleRowClick = async ({ currentTarget }) => {
    const foodName = currentTarget.firstChild.innerText;
    if (foodName === selectedFood) {
      setDetailsOpen(true);
      return;
    }
    setSelectedFood(foodName);
    setSelectedFoodDetails(null);
    setDetailsOpen(true);
    const food = await getFoodByName(foodName);
    if (food) {
      const proximates = parseNutrients({ nutrients: food.proximates });
      const vitamins = parseNutrients({ nutrients: food.vitamins });
      const minerals = parseNutrients({ nutrients: food.inorganics });
      const combinedResults = [...proximates, ...vitamins, ...minerals];
      setSelectedFoodDetails(combinedResults);
    }
  };

  const handleCloseModal = () => {
    setDetailsOpen(false);
  };

  const handleNutrientSelection = (event, value) => {
    setNutrient(value);
  };

  return (
    <>
      <Filters/>
      <SearchField loading={nutrients.length === 0}
                   onSelection={handleNutrientSelection}
                   onButtonClick={getFoods}
                   optionsContext='getNutrients'
                   buttonContext='getFoodsByNutrient'
                   values={nutrients}
                   buttonDisabled={!nutrient}
                   label='Choose nutrient'
                   labelProp='label'
                   noMatchText='No nutrient matched!!'
                   groupBy={(option) => option.group}
                   strict={false}
      />
      {foods && <ResultsTable
        data={foods}
        title={resultsTitle}
        onRowClick={handleRowClick}
        sortColumns={[0, 1, 2]}
      />}
      {detailsOpen && (
        <ModalPanel
          open={detailsOpen}
          onClose={handleCloseModal}
          title={selectedFood}
          subtitle='Nutritional information per 100g of food'
        >
          {selectedFoodDetails ? <ResultsTable data={selectedFoodDetails} scrollable sortColumns={['nutrient']}/> : <LoadingPanel/>}
        </ModalPanel>
      )}
    </>
  );
};

export default SearchFoodByNutrient;