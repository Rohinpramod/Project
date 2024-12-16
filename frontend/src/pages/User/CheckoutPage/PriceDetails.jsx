import React from "react";

function PriceDetails({items}){
  return (
    <div className="price-details">
      <div className="price-row=">
        <span>Items Price:</span>
        <span>${items?.itemsPrice.toFixed(2)}</span>
      </div>
      <div className="price-row">
        <span>Tax:</span>
        <span>${items?.tax.toFixed(2)}</span>
      </div>
      <div className="price-row">
        <span>Discount:</span>
        <span>-${items?.discount.toFixed(2)}</span>
      </div>
      <div className="price-row total">
        <span>Total:</span>
        <span>${items?.total.toFixed(2)}</span>
      </div>
    </div>
  );
}
export default PriceDetails;
