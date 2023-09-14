import {  useState } from "react";
import { Link, useSearchParams, useLoaderData } from "react-router-dom";
import { getVans } from "../../api/vanapi";

export function loader() {
  return getVans()
  
}

const Vans = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // const [vans, setVans] = useState([]);
  const [error, setError] = useState(null);
  const vans = useLoaderData()
  // console.log(data);

  const typeFilter = searchParams.get("type");
  // console.log(typeFilter);
  // console.log(searchParams.toString());

  const displayedVans = typeFilter
    ? vans.filter((van) => van.type.toLowerCase() === typeFilter)
    : vans;

  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }


  if (error) {
    return <h1>There was an error: {error.message} </h1>;
  }

  const vanElements = displayedVans.map((van) => (
    <div key={van.id} className="van-tile">
      {/* save search filters */}
      <Link
        to={van.id}
        state={{ search: `?${searchParams.toString()}`, type: typeFilter }}
      >
        <img className="van-image " src={van.imageUrl} alt="" />
        <div className="van-info">
          <h3>{van.name}</h3>
          <p>
            {van.price}
            <span>/day</span>
          </p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
      </Link>
    </div>
  ));

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list-filter-buttons">
        <button
          className={`${
            typeFilter === "simple"
              ? "van-type simple selected"
              : "van-type simple"
          }`}
          onClick={() => handleFilterChange("type", "simple")}
        >
          Simple
        </button>
        <button
          className={`${
            typeFilter === "luxury"
              ? "van-type luxury selected"
              : "van-type luxury"
          }`}
          onClick={() => handleFilterChange("type", "luxury")}
        >
          luxury
        </button>
        <button
          className={`${
            typeFilter === "rugged"
              ? "van-type rugged selected"
              : "van-type rugged"
          }`}
          onClick={() => handleFilterChange("type", "rugged")}
        >
          rugged
        </button>
        {typeFilter ? (
          <button
            className="van-type clear-filters"
            onClick={() => handleFilterChange("type", null)}
          >
            clear filter
          </button>
        ) : null}
      </div>
      <div className="van-list">{vanElements}</div>
    </div>
  );
};

export default Vans;
