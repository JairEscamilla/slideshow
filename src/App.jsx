import { Slideshow, Slide, TextoSlide } from "./components/slideshow";
import styled from "styled-components";
import img1 from "./images/1.jpg";
import img2 from "./images/2.jpg";
import img3 from "./images/3.jpg";
import img4 from "./images/4.jpg";
import "./estilos.css";

function App() {
  return (
    <main>
      <Titulo>Productos Destacados</Titulo>
      <Slideshow
        controles
        autoplay
        velocidad="500"
        intervalo="5000"
      >
        <Slide>
          <a href="https://github.com/JairEscamilla/slideshow">
            <img src={img1} alt="" />
          </a>
          <TextoSlide>
            <p>15% de descuento en productos de Apple</p>
          </TextoSlide>
        </Slide>
        <Slide>
          <a href="https://github.com/JairEscamilla/slideshow">
            <img src={img2} alt="" />
          </a>
          <TextoSlide>
            <p>15% de descuento en productos de Apple</p>
          </TextoSlide>
        </Slide>
        <Slide>
          <a href="https://github.com/JairEscamilla/slideshow">
            <img src={img3} alt="" />
          </a>
          <TextoSlide>
            <p>15% de descuento en productos de Apple</p>
          </TextoSlide>
        </Slide>
        <Slide>
          <a href="https://github.com/JairEscamilla/slideshow">
            <img src={img4} alt="" />
          </a>
          <TextoSlide>
            <p>15% de descuento en productos de Apple</p>
          </TextoSlide>
        </Slide>
      </Slideshow>
      <Titulo>Productos Nuevos</Titulo>
      <Slideshow />
    </main>
  );
}

const Titulo = styled.p`
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

export default App;
