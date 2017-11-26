import { StackNavigator } from 'react-navigation';

import CitiesList from './cities_list'
import AddNewCity from './add_new_city'

const WorldClockScreen = StackNavigator({
  CitiesList: { screen: CitiesList },
  AddNewCity: { screen: AddNewCity }
});

export default WorldClockScreen;