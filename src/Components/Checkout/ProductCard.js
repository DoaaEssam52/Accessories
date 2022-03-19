import React from "react";


function ProductCard(props) {
  const Product = props.Product;

  return (
    <>
      <div className="checkout-product">
        <img className="checkout-product__image" src={Product.image} />
        <div className="checkout-product__info">
          <p className="checkout-product__info__title">{Product.title}</p>
          <h6 className="row mx-0">
            <span className="col-12 col-md-6 px-0">{Product.count} item(s)</span>
            <span className="col-12 col-md-6 checkout-product__total-cost">
              {Math.round(Product.price * Number(Product.count)*100)/100} L.E
            </span>
          </h6>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
