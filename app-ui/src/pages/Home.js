import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CategoryCtx } from "../context/category/categoryContext";
import ProductsByArrival from "../components/ProductsByArrival";
import ProductsBySell from "../components/ProductsBySell";

const Home = () => {
  const { getCategories, categories } = useContext(CategoryCtx);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <div className="row mb-5">
        <div className="col-md-3 col-sm-6 col-xs-12">
          <div className="card">
            <div className="card-header">
              <h5>Categories</h5>
            </div>
            <ul className="list-group">
              {categories.map((category) => (
                <li className="list-group-item" key={category._id}>
                  <Link to={`/category/${category.title.toLowerCase()}`}>
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <h3 className="mt-5">New Arrivals</h3>
      <ProductsByArrival />
      <h3 className="mt-5">Best Sell</h3>
      <ProductsBySell />
    </div>
  );
};

export default Home;
