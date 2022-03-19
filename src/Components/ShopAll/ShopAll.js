import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useSelector } from "react-redux";
import Loader from "../Loader";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function ShopAll() {
  const products = useSelector((state) => state.allProducts.products); //all products
  const [filteredProducts, setFiltered] = useState(products); //products filtered
  const [category, showCategory] = useState(false); //show and hide category options
  const [price, showPrice] = useState(false); //show and hide price slider
  const [error, setError] = useState(true);
  const [currentCategory, setCurrentCategory] = useState("All"); //current category
  const [maxPrice, setMaxPrice] = useState(1000); //current price

/***************
Category options
****************/
  const categories = [
    "All",
    "men's clothing",
    "jewelery",
    "electronics",
    "women's clothing",
  ];

/*******************
Wait time in loading
*******************/
  useEffect(() => {
    const timer = () => {
      setTimeout(() => {
        setError(false);
      }, [3000]);
    };
    const timeLoad = timer();
    return () => {
      clearTimeout(timeLoad);
    };
  }, []);

/********
Filtering
*********/
  useEffect(() => {
    if (currentCategory != "All") {
      let updatedProducts = products?.filter((item) => {
        return (
          item.category == currentCategory && parseInt(item.price) <= maxPrice
        );
      });
      setFiltered(updatedProducts);
    } else {
      let updatedProducts = products?.filter((item) => {
        return parseInt(item.price) <= maxPrice;
      });
      setFiltered(updatedProducts);
    }
  }, [currentCategory, maxPrice]);
  return (
    <div>
      {error == false && (
        <div className="row shop-all">
          <div className="filter col-12 col-sm-6 col-md-3">
            <h2 className="filter__title">Filter by</h2>
            <ul className="px-0">
              <li className="filter__item">
                <div className="d-flex justify-content-between">
                  <span>Category</span>
                  <span
                    className="filter__item__icon"
                    onClick={() => {
                      showCategory(!category);
                    }}
                  >
                    {category ? "x" : "+"}
                  </span>
                </div>
                {category && (
                  <ul className="px-0">
                    {categories.map((product, index) => {
                      return (
                        <li
                          className={`filter__item__type ${
                            currentCategory == product
                              ? "filter__item__type--active"
                              : ""
                          }`}
                          key={index}
                          onClick={() => {
                            setCurrentCategory(product);
                          }}
                        >
                          {product}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
              <li className="filter__item">
                <div className="d-flex justify-content-between">
                  <span>Price</span>
                  <span
                    className="filter__item__icon"
                    onClick={() => {
                      showPrice(!price);
                    }}
                  >
                    {price ? "x" : "+"}
                  </span>
                </div>
                {price && (
                  <div className="mt-2">
                    <Slider
                      min={6}
                      max={1000}
                      defaultValue={1000}
                      onChange={(val) => {
                        setMaxPrice(val);
                      }}
                    />
                    <p className="mt-2">Max. price: {maxPrice} L.E</p>
                  </div>
                )}
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-9 row mx-0 justify-content-center">
            {filteredProducts?.map((value, index) => {
              return (
                <div
                  key={index}
                  className="col-12 col-sm-4 col-lg-3 text-center"
                >
                  <ProductCard Product={value} id={index} />
                </div>
              );
            })}
          </div>
        </div>
      )}
      {error == true && <Loader />}
    </div>
  );
}

export default ShopAll;
