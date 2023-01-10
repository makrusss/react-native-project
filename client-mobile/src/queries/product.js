import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query Query {
    getProducts {
      id
      name
      price
      slug
      mainImg
      Category {
        name
      }
      description
    }
  }
`;

export const GET_PRODUCT_DETAIL = gql`
  query Query($getProductId: ID) {
    getProduct(id: $getProductId) {
      Category {
        name
      }
      Images {
        imgUrl
      }
      description
      mainImg
      name
      price
      slug
      stock
      user {
        email
      }
    }
  }
`;
