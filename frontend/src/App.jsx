import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
const App = ()=>{
  return (
    <>
    <Header/>
    <Container>
      <Outlet/>
    </Container>
    
    </>
  )
};
export default App;