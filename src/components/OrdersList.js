import { Link } from "react-router-dom";
import classes from "./OrdersList.module.css";
const OrdersList = (props) => {
  return (
    <div className={classes.tableContainer}>
      <ul className={classes.responsiveTable}>
        <li className={classes.tableHeader}>
          <div className={classes.col + " " + classes.col1}>Order №</div>
          <div className={classes.col + " " + classes.col2}>Order date</div>
          <div className={classes.col + " " + classes.col3}>Total price</div>
        </li>
        {props.orders.map((item) => {
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
                data-label="Order date"
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

export default OrdersList;
