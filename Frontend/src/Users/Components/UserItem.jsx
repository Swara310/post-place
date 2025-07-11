import React from "react";
import "./UserItem.css";
import Avatar from "../../Shared/Components/UIElements/Avatar";
import { Link } from "react-router-dom";
import Card from "../../Shared/Components/UIElements/Card";

const UserItem = (props) => {
  return (
    <li className="user-item">
      <Card className="user-item__content card--no-bg">
        <Link to={`/${props.id}/places`}>
          <div className="user-item__image">
            <Avatar image={props.image} alt={props.name} />
          </div>
          <div className="user-item__info">
            <h2>{props.name}</h2>
            <h3>
              {props.placeCount} {props.placeCount === 1 ? "Place" : "Places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};
export default UserItem;
