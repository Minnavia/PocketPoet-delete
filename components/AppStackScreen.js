import { NavigationContainer } from "@react-navigation/native";
import WritePoem from "../screens/writePoem";

class AppStackScreen extends React.Component {

    render(){
        return(
            <NavigationContainer>
                <Stack.Navigator initialRouteName={this.props.initialRouteName}>
                    <Stack.Screen 
                        name='Home'
                        component={HomeScreen}
                    />
                    <Stack.Screen 
                        name='Write'
                        component={WritePoem}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}