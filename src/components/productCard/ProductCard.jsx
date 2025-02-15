import React, { useEffect, useRef } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { HiOutlineArrowSmallRight } from "react-icons/hi2";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../../Context/cartContext/CartContext";

export default function ProductCard({ image, title, description, price, id }) {
  const { addToCart } = useCart();
  const btnSection = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    btnSection.current.style.justifyContent = price
      ? "space-between"
      : "flex-end";
  }, [price]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Stop event bubbling to parent NavLink

    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
      window.scrollTo(0, 0);
    } else {
      addToCart({ id, title, description, price, image });
    }
  };

  return (
    <NavLink to={`/product/${id}`} className="item" onClick={() => window.scrollTo(0, 0)}>
      <div className="image-container">
        <div className="btn-section">
          <div className="btn-text">for more info</div>
        </div>
        <img src={image} alt="" loading="eager" />
      </div>

      <div className="text-container">
        <h3 className="title">{title}</h3>
        <p className="description">{description}</p>
        <div className="btn-section-container" ref={btnSection}>
          {price && (
            <h6 className="price">
              {price} <span>EGP</span>
            </h6>
          )}
          <NavLink to={"/cart"} className="addToCart" onClick={handleAddToCart}>
            <h6>Add to cart</h6>
            <CiShoppingCart />
          </NavLink>
        </div>
      </div>
    </NavLink>
  );
}
