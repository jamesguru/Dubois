import styled from "styled-components";
import {
  ShoppingCartOutlined,
  SearchOutlined,
  FavoriteOutlined,
  FavoriteBorderOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import Product from "../pages/Product";
import { showAverage } from "../rating";

const Container = styled.div`
  background-color: #f7f7f7;

  z-index: 999;

  margin-right: 10px;

  margin-bottom: 5px;
  transition: all 1s ease;
  position: relative;

  cursor: pointer;

  &:hover {
    border-radius: 10px;

    transform: scale(1.05);
  }
`;

const Image = styled.img`
  width: 200px;

  height: auto;

  position: relative;

  margin: 20px;

  object-fit: cover;

  display: flex;

  align-items: center;

  justify-content: center;

  @media screen and (max-width: 600px) {
    width: 100px;

    height: auto;

    margin: 15px;
  }
`;

const Discount = styled.span`
  color: white;

  font-weight: 900;

  padding: 4px;

  position: absolute;

  background-color: #d1411e;

  top: 0;

  right: 0;

  animation: move 0.5s infinite alternate;

  @keyframes move {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
`;

const InfoContainer = styled.div`
  display: flex;

  align-items: center;

  justify-content: center;

  margin-bottom: 50px;
  position: relative;
  flex-direction: column;
`;

const Title = styled.h3`
  text-align: center;

  font-weight: 900;

  width: 200px;

  font-size: 20px;

  @media screen and (max-width: 600px) {
    width: 100px;

    font-size: 15px;

    margin-right: 10px;
  }
`;

const Price = styled.span`
  text-align: center;

  font-weight: 900;

  font-size: 18px;
`;

const Wholesale = styled.div`
  color: #dcca87;
  width: 80%;
  background-color: #0c0c0c;

  font-weight: 900;

  font-size: 15px;

  padding: 0px 5px;

  bottom: 0;

  left: 0;

  @media screen and (max-width: 600px) {
    font-weight: 900;
    font-size: 12px;
  }
`;

const product = ({ item }) => {
  const caclDiscount = (price1, price2) => {
    if (price1 && price2) {
      const discount = ((price1 - price2) / price1) * 100;

      return ` - ${Math.floor(discount)}%`;
    } else {
      return "";
    }
  };

  return (
    <Container>
      <Link
        style={{ color: "inherit", textDecoration: "none" }}
        to={`/product/${item._id}`}
      >
        <InfoContainer>
          <Image src={item.img} alt="" />

          {item.wholesalePrice && item.wholesaleSeller && (
            <>

            <Wholesale>wholesale available </Wholesale>
            <Wholesale>From {item.wholesaleMinimumQuantity} pieces for {item.wholesalePrice}</Wholesale>
            </>
           
            
          )}

          <Title>{item.title}</Title>

          {item.discountedPrice && <Price> ksh {item.discountedPrice}</Price>}
          {item.discountedPrice ? (
            <Price style={{ textDecoration: "line-through" }}>
              {" "}
              ksh {item.originalPrice}{" "}
            </Price>
          ) : (
            <Price> ksh {item.originalPrice}</Price>
          )}

          {item && item?.ratings && item?.ratings.length > 0
            ? showAverage(item)
            : ""}
        </InfoContainer>
      </Link>

      {item.discountedPrice && (
        <Discount>
          {caclDiscount(item.originalPrice, item.discountedPrice)}
        </Discount>
      )}
    </Container>
  );
};

export default product;
