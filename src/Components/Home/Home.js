import React, { useState, useEffect } from "react";
import ProductCard from "../ShopAll/ProductCard";
import i2 from "../../Images/home_2.webp";
import i3 from "../../Images/home_3.webp";
import i7 from "../../Images/home_9.webp";
import i8 from "../../Images/home_10.webp";
import ItemsCarousel from "react-items-carousel";
import { Link } from "react-router-dom";
import Fixed_widget from "./Fixed_widget";
import Changed_widget from "./Changed_widget";
import Img_card from "./Img_card";
import Home_Fixed_Cards_Data from "./../../Functions/Home_Fixed_Cards_Data";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../../redux/actions/productActions";
import axios from "axios";
import Loader from "../Loader";

function Home() {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  function getWindowWidth() {
    const width = window.innerWidth;
    return width;
  }
  function handleResize() {
    setWidth(getWindowWidth());
  }
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [width, setWidth] = useState(getWindowWidth());
  const dispatch = useDispatch();
  const [error, setError] = useState(true);
  const allproducts = useSelector((state) => state.allProducts.products);
  const someproducts = allproducts?.slice(11);
  const fetchProducts = async () => {
    const response = await axios
      .get("https://fakestoreapi.com/products")
      .catch((err) => {
        setError(true);
      });
    dispatch(setProducts(response.data));
    setError(false);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const imgCards = Home_Fixed_Cards_Data().imgCards;
  const section3Data = Home_Fixed_Cards_Data().section3Data;
  return (
    <>
      {error == false && (
        <>
          <header className="header">
            <h1 className="header__title">CUE THE COLOR</h1>
            <div className="text-center">
              <Link to={"/ShopAll"}>
                <button className="header__button">Shop the collection</button>
              </Link>{" "}
            </div>
          </header>
          <div className="home-carousel">
            <h4 className="sub-title">Best Sellers</h4>
            <ItemsCarousel
              requestToChangeActive={setActiveItemIndex}
              activeItemIndex={activeItemIndex}
              activePosition={"center"}
              numberOfCards={width > 800 ? 4 : width < 550 ? 1 : 2}
              gutter={20}
              leftChevron={<button>{"<"}</button>}
              rightChevron={<button>{">"}</button>}
              outsideChevron
              chevronWidth={chevronWidth}
            >
              {someproducts.map((value) => {
                return (
                  <div className="carousel1__item" key={value.id}>
                    <ProductCard Product={value} />
                  </div>
                );
              })}
            </ItemsCarousel>
            <div className="text-center">
              <Link to={"/ShopAll"}>
                <button
                  type="button"
                  className="home-button"
                  onClick={() => {}}
                >
                  Shop All Bags
                </button>
              </Link>
            </div>
          </div>
          <div className="row widgets">
            <div className="col-10 col-md-6  widget">
              <Changed_widget imgUrl={i2} title={"I'm a product"} price={100} />
            </div>
            <div className="col-10 col-md-6 widget">
              <Fixed_widget imgUrl={i3} title={" MINI LEATHER GOODS"} />
            </div>
            <div className="col-10 col-md-6 col-sm-7 widget">
              <Fixed_widget imgUrl={i7} title={" MINI LEATHER GOODS"} />
            </div>
            <div className="col-10 col-md-6 col-sm-7 widget">
              <Changed_widget imgUrl={i8} title={"I'm a product"} price={100} />
            </div>
          </div>
          <div className="row section-3">
            {section3Data.map((item, index) => {
              return (
                <div
                  key={index}
                  className="col-lg-3 col-sm-7 col-10 section-3__card"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)),url(${item.imgSrc})`,
                  }}
                >
                  <div className="section-3__card__content">
                    <h5 className="section-3__card__content__title1">
                      {item.title1}
                    </h5>
                    <h4 className="section-3__card__content__title2">
                      {item.title2}
                    </h4>
                    <Link to={item.navTo}>
                      <span className="section-3__card__content__btn">
                        {item.btn}
                      </span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="last-section">
            <div className="carousel2">
              <h4 className="sub-title2">
                FOLLOW
                <br />
                Belle ON INSTAGRAM
              </h4>
              <ItemsCarousel
                requestToChangeActive={setActiveItemIndex}
                activeItemIndex={activeItemIndex}
                activePosition={"center"}
                numberOfCards={
                  width > 1100 ? 5 : width > 800 ? 3 : width < 550 ? 1 : 2
                }
                leftChevron={<button>{"<"}</button>}
                rightChevron={<button>{">"}</button>}
                outsideChevron
                chevronWidth={chevronWidth}
              >
                {imgCards.map((value) => {
                  return (
                    <React.Fragment key={value.id}>
                      <Img_card imgUrl={value.imgurl} />
                    </React.Fragment>
                  );
                })}
              </ItemsCarousel>
            </div>
            <div className="row justify-content-around">
              <h1 className="col-sm-4 col-12 last-section__title">
                Worldwide shipping
              </h1>
              <h1 className="col-sm-4 col-12 last-section__title">
                Easy 30 day returns
              </h1>
              <h1 className="col-sm-4 col-12 last-section__title">
                12 month warranty
              </h1>
            </div>
          </div>
        </>
      )}
      {error == true && (
       <Loader/>
      )}
    </>
  );
}

export default React.memo(Home);
