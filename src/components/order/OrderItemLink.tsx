import { Link } from "react-router-dom";

import { IOrderItemLinkProps } from "types";

const OrderItemLink = ({ item }: IOrderItemLinkProps) => {
  return (
    <Link
      to={`/products/${item.product_id}`}
      className="info_list_box"
      aria-label={`${item.product_name} 상품 페이지로 이동`}
    >
      <img
        className="info_list_img"
        alt={`${item.product_name}_상품 이미지`}
        src={item.image_src.slice(0, -4) + "_150x200.jpg"}
      />
    </Link>
  );
};

export default OrderItemLink;
