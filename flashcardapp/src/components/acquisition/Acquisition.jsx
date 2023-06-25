import React from "react";
// decks begin use as a test
//import Decks from "./Decks";
import Decks from "./Decks";
import DeckCreate from "./DeckCreate";
import { useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
//import { useNavigate } from "react-router-dom";

// React Carousel
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";

const items = [
  {
    id: 1,
    altText: "Slide 1",
    caption: "Slide 1",
  },
  {
    id: 2,
    altText: "Slide 2",
    caption: "Slide 2",
  },
  {
    id: 3,
    altText: "Slide 3",
    caption: "Slide 3",
  },
];

export default function Acquisition(props) {
  // State to house movie data
  const [decks, setDecks] = useState([]);

  // React Carousel
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        className="custom-tag"
        tag="div"
        key={item.id}
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
      >
        <CarouselCaption
          className="text-danger"
          captionText={item.caption}
          captionHeader={item.caption}
        />
      </CarouselItem>
    );
  });

  const fetchDecks = async () => {
    const url = "http://localhost:4040/deck/";
    const requestOptions = {
      method: "GET",
      headers: new Headers({
        Authorization: props.token,
      }),
    };
    try {
      const res = await fetch(url, requestOptions);
      const data = await res.json();
      setDecks(data.getAllDecks);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  // Use useEffect to run the fetch function to check for and maintain our token
  useEffect(() => {
    if (props.token) {
      fetchDecks();
    }
  }, [props.token]);

  return (
    <>
      {/* <style>
        {`.custom-tag {
              max-width: 100%;
              height: 500px;
              background: black;
            }`}
      </style>
      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
        />
      </Carousel> */}
      <Container>
        <Row>{/* <DeckCreate /> */}</Row>
        <Row>
          {/* <Col md="10"> */}
          <Decks decks={decks} token={props.token} fetchDecks={fetchDecks} />
          {/* </Col> */}
          {/* <Col md="2"> */}
          {/* <DeckCreate /> */}
          {/* </Col> */}
        </Row>
      </Container>
    </>
  );
}
