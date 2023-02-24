import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classes from "./OrdersList.module.css";

const sortByDateAsc = (arr) => {
  return arr.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
};
const sortByDateDesc = (arr) => {
  return arr.sort((a, b) => new Date(a.orderDate) - new Date(b.orderDate));
};

const OrdersList = (props) => {
  const [orders, setOrders] = useState(props.orders);
  const ord = localStorage.getItem("isDesc")
    ? localStorage.getItem("isDesc")
    : true;
  const [isDesc, setIsDesc] = useState(ord);
  const orderByDateHandler = () => {
    localStorage.setItem("isDesc", !isDesc);
    setIsDesc(!isDesc);
  };
  useEffect(() => {
    console.log(isDesc);
    let thisArr = [];
    if (isDesc) {
      thisArr = sortByDateDesc(orders);
    } else {
      thisArr = sortByDateAsc(orders);
    }
    setOrders([...thisArr]);
  }, [isDesc]);

  return (
    <div className={classes.tableContainer}>
      <ul className={classes.responsiveTable}>
        <li className={classes.tableHeader}>
          <div className={classes.col + " " + classes.col1}>Order №</div>
          <div className={classes.col + " " + classes.col2}>
            Ordering date
            <button onClick={orderByDateHandler} className={classes.buttonSort}>
              {isDesc ? "↥" : "↧"}
            </button>
          </div>
          <div className={classes.col + " " + classes.col3}>Total price</div>
        </li>
        {orders.map((item) => {
          const d = new Date(item.orderDate);
          return (
            <li className={classes.tableRow} key={item.name}>
              <div
                className={classes.col + " " + classes.col1}
                data-label="Order №"
              >
                <Link to={`/orders/${item.name}`} className={classes.itemLink}>
                  {item.name}
                </Link>
              </div>
              <div
                className={classes.col + " " + classes.col2}
                data-label="Ordering date"
              >
                {d.getDate() +
                  "/" +
                  (Number(d.getMonth()) + 1) +
                  "/" +
                  d.getFullYear() +
                  " at  " +
                  d.getHours() +
                  ":" +
                  d.getMinutes()}
              </div>
              <div
                className={classes.col + " " + classes.col3}
                data-label="Total price"
              >
                ${item.totalPrice}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default React.memo(OrdersList);
