import React, { useState, useRef, useEffect } from "react";
import ProductCard from "./ProductCard";
import { RiVisaLine } from "react-icons/ri";
import Payment_Validate from "./../../Functions/Payment_Validate";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { resetCart } from "./../../redux/actions/productActions";

function Checkout() {
  function emptyCart() {
    axios.post("http://localhost:3001/Cart", { items: [] });
  }
  const dispatch = useDispatch();
  const cart_items = useSelector((state) => state.cartProducts.cartProducts);
  let totalPrice = null;
  const isSubmit = useRef(false);
  const [visaData, setVisaData] = useState({
    CardNumber: "",
    CardHolder: "",
    Expires: "",
    CVC: "",
  });
  const [formsErrors, setErrors] = useState({});
  const handleInput = (e) => {
    let key = e.target.name;
    let value = e.target.value;
    setVisaData({ ...visaData, [key]: value });
    setErrors({});
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(Payment_Validate(visaData));
    isSubmit.current = true;
  };
  useEffect(() => {
    if (
      !formsErrors.CardNumber &&
      !formsErrors.CardHolder &&
      !formsErrors.CVC &&
      !formsErrors.Expires
    ) {
      if (isSubmit.current) {
        emptyCart();
        dispatch(resetCart({ items: [] }));
        setVisaData({
          CardNumber: "",
          CardHolder: "",
          Expires: "",
          CVC: "",
        });
      } else {
        isSubmit.current = false;
      }
    }
  }, [formsErrors]);
  return (
    <div className="row Checkout">
      <div className="col-10 col-md-8 col-lg-5 Chechout__summarize">
        <p className="Chechout__summarize__title">
           Shopping cart
        </p>
        <div className="Checkout__summarize__item-container">
          {cart_items.map((product, index) => {
            totalPrice += product.price * product.count;
            return (
              <div key={index}>
                <ProductCard Product={product} />
              </div>
            );
          })}
        </div>
        <h6 className="total-price">Total price is {Math.round(totalPrice*100)/100} L.E.</h6>
      </div>
      <div className="col-10 col-md-8 col-lg-5 Chechout__form">
        <div>
          <div className="Chechout__form__visa">
            <RiVisaLine />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row mx-0">
              <div className="col-12 Chechout__form__items">
                <label className="Chechout__form__label">Card Number</label>
                <input
                  type="number"
                  className="Chechout__form__inputs"
                  name="CardNumber"
                  onChange={handleInput}
                  value={visaData.CardNumber}
                ></input>
                <p className="Chechout__form__error">
                  {formsErrors.CardNumber}
                </p>
              </div>
              <div className="col-12 Chechout__form__items">
                <label className="Chechout__form__label">Card Holder</label>
                <input
                  type="text"
                  className="Chechout__form__inputs"
                  name="CardHolder"
                  onChange={handleInput}
                  value={visaData.CardHolder}
                ></input>
                <p className="Chechout__form__error">
                  {formsErrors.CardHolder}
                </p>
              </div>

              <div className="col-6 Chechout__form__items">
                <label className="Chechout__form__label">Expires</label>
                <input
                  type="text"
                  className="Chechout__form__inputs"
                  name="Expires"
                  onChange={handleInput}
                  value={visaData.Expires}
                ></input>
                <p className="Chechout__form__error">{formsErrors.Expires}</p>
              </div>
              <div className="col-6 Chechout__form__items">
                <label className="Chechout__form__label">CVC</label>
                <input
                  type="number"
                  className="Chechout__form__inputs"
                  name="CVC"
                  onChange={handleInput}
                  value={visaData.CVC}
                ></input>
                <p className="Chechout__form__error">{formsErrors.CVC}</p>
              </div>
            </div>
            <div className="text-center">
              <button className="Chechout__form__button" type="submit">
                Checkout
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
