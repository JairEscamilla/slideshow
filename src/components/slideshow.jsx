import React, { useRef, useEffect, useCallback } from "react";
import { ReactComponent as FlechaIzquierda } from "../images/iconmonstr-angel-left-thin.svg";
import { ReactComponent as FlechaDerecha } from "../images/iconmonstr-angel-right-thin.svg";
import styled from "styled-components";

const ContenedorPrincipal = styled.div`
  position: relative;
`;

const ContenedorSlideshow = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

const Slide = styled.div`
  min-width: 100%;
  overflow: hidden;
  transition: 0.3s ease all;
  z-index: 10;
  max-height: 500px;
  position: relative;

  img {
    width: 100%;
    vertical-align: top;
  }
`;

const TextoSlide = styled.div`
  background: ${(props) =>
    props.colorFondo ? props.colorFondo : "rgba(0, 0, 0, 0.3)"};
  color: ${(props) => props.colorTexto || "white"};
  width: 100%;
  padding: 10px 60px;
  text-align: center;
  position: absolute;
  bottom: 0;

  @media screen and (max-width: 700px) {
    position: relative;
    background: #000;
  }
`;

const Controles = styled.div`
  position: absolute;
  z-index: 11;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const Boton = styled.button`
  pointer-events: all;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  width: 50px;
  height: 100%;
  text-align: center;
  position: absolute;
  transition: 0.3s ease all;

  &:hover {
    background: rgba(0, 0, 0, 0.2);

    path {
      fill: #fff;
    }
  }

  path {
    filter: ${(props) =>
      props.derecho
        ? "drop-shadow(-2px 0px 0px #fff )"
        : "drop-shadow(2px 0px 0px #fff )"};
  }
  ${(props) => (props.derecho ? "right: 0" : "left: 0")}
`;

const Slideshow = ({ children, controles, autoplay, velocidad, intervalo }) => {
  const slideshow = useRef(null);
  const interval = useRef(null);


  const siguiente = useCallback( () => {
    if (slideshow.current.children.length > 0) {
      const primerElemento = slideshow.current.children[0];
      slideshow.current.style.transition = `${velocidad}ms ease-out all`;
      slideshow.current.style.transform = `translateX(-100%)`;

      const transicion = () => {
        slideshow.current.style.transition = "none";
        slideshow.current.style.transform = "translateX(0)";
        slideshow.current.appendChild(primerElemento);
        slideshow.current.removeEventListener("transitionend", transicion);
      };

      slideshow.current.addEventListener("transitionend", transicion);
    }
  }, [velocidad])

  const anterior = () => {
    const slideShowLength = slideshow.current.children.length;
    if (slideShowLength > 0) {
      const ultimoElemento = slideshow.current.children[slideShowLength - 1];
      slideshow.current.insertBefore(
        ultimoElemento,
        slideshow.current.firstChild
      );
      slideshow.current.style.transition = "none";
      slideshow.current.style.transform = "translateX(-100%)";
      setTimeout(() => {
        slideshow.current.style.transition = `${velocidad}ms ease-out all`;
        slideshow.current.style.transform = `translateX(0)`;
      }, 30);
    }
  };

  useEffect(() => {
    if(!autoplay)
      return;
    interval.current = setInterval(() => {
      siguiente();
    }, intervalo);

    slideshow.current.addEventListener("mouseenter", () => {
      clearInterval(interval.current);
    });

    slideshow.current.addEventListener("mouseleave", () => {
      interval.current = setInterval(() => {
        siguiente();
      }, intervalo);
    });

  }, [autoplay, intervalo, siguiente]);

  return (
    <ContenedorPrincipal>
      <ContenedorSlideshow ref={slideshow}>
        {children}
      </ContenedorSlideshow>

      {
        controles &&
          <Controles>
            <Boton onClick={anterior}>
              <FlechaIzquierda />
            </Boton>
            <Boton derecho onClick={siguiente}>
              <FlechaDerecha />
            </Boton>
          </Controles>
      }
    </ContenedorPrincipal>
  );
};


export {
  Slideshow,
  Slide,
  TextoSlide
}