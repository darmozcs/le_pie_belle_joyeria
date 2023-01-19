import { Link } from "react-router-dom";
import "./itemcard.css"

const ItemCard = ({data, link}) =>{
    return(
        <div className="card__container">
  <div className="info__container">
  <Link to={link} state={{data: data.data()}} className="link">
    <div className="details__button">detalles</div>
  </Link>
  </div>
  <div className="card__image__container">
    <img className="card__image" src={data.data().image} />
  </div>
  <div className="info__display">
    <h4 className="tittle">{data.data().tittle}</h4>
    <div className="size__container">
      <h5 className="size__tag">
        talla:
      </h5>
      <h5 className="size">{data.data().size}</h5>
    </div>
    <h3 className="price">$ {data.data().price}</h3>
  </div>
</div>
    );
}

export default ItemCard;