import { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./PageWrapper.module.css";

export const PageWrapper = (props) => {
  const [searchValue, setSearchValue] = useState("");

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
    props.onSearchChanged(event.target.value);
  };

  const resetFilter = () => {
    setSearchValue("");
    props.onSearchChanged("");
  };

  const search = (
    <div className={classes.SearchBlock}>
      <img src="/img/search.svg" alt="Search" />
      {searchValue && (
        <img
          onClick={resetFilter}
          className={classes.Clear}
          src="/img/btn-remove.svg"
          alt="Clear"
        />
      )}
      <input
        onChange={onChangeSearchInput}
        placeholder="Search..."
        value={searchValue}
      />
    </div>
  );

  const backArrow = (
    <Link
      to={`/orders`}
      style={{
        display: "block",
        height: "90px",
        overflow: "hidden",
        margin: "20px",
      }}
    >
      <img
        style={{
          width: "90px",
          height: "90px",
          objectFit: "cover",
          position: "absolute",
        }}
        src="/img/back-arrow.svg"
        alt="Back"
      />
    </Link>
  );

  return (
    <div className={classes.Wrap}>
      <div className={classes.WrapHeader}>
        {props.isOrder && backArrow}
        <h1>{props.title}</h1>
        {props.addSearch && search}
      </div>
      <div className={classes.WrapContainer}>{props.children}</div>
    </div>
  );
};
