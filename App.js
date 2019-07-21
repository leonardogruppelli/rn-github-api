import {
  createStackNavigator,
  createAppContainer
} from 'react-navigation'
import Repositories from './Screens/Repositories'
import Details from './Screens/Details'

const Root = createStackNavigator({
  Repositories: {
    screen: Repositories,
    navigationOptions: {
      header: null
    }
  },
  Details
})

export default createAppContainer(Root)