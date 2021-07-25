import { Slideshow } from "./components/slideshow";
import styled from 'styled-components';
import './estilos.css';

function App() {
  return (
    <main>
      <Titulo>
        Productos Destacados
      </Titulo>
      <Slideshow/>
    </main>
  );
}


const Titulo = styled.p ` 
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

export default App;
