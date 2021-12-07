import { useState } from "react";
import { Link } from "react-router-dom";
import OrderTotalDetail from "./OrderTotalDetail";
import useCheckout from "../hooks/useCheckout";
import downArrow from "../images/down-arrow.png";
import upArrow from "../images/up-arrow-icon.png";

const OrderTotal = ({
  usedMileage,
  selectOption,
  handleChangeDelivery,
  itemCheckOut,
  checkoutNumber,
  isPc,
  isTablet,
  isMobile,
  handleOrderSubmit,
}) => {
  const [checkoutNum, setCheckoutNum] = useState(checkoutNumber);
  const [remainderClass, setRemainderClass] = useState("info_remainder");
  const [arrowImg, setArrowImg] = useState(downArrow);
  const [closeText, setCloseText] = useState("");

  const { checkoutData, loadingCheckout, checkoutError, mutateCheckout } =
    useCheckout(checkoutNumber);

  if (checkoutError) return <div>failed to load</div>;
  if (loadingCheckout) return <div>loading...</div>;

  const items = checkoutData.line_items;
  const totalPrice = items
    .map((item) => item.variant_price * item.quantity)
    .reduce((sum, itemPrice) => sum + itemPrice, 0);

  const deliveryCharge = localStorage.getItem("delivery");
  const firstItem = items[0];
  const remainder = items.filter((item) => item !== firstItem);
  const itemQuantity = items.map((item) => item.quantity);
  const sum = itemQuantity.reduce((a, b) => a + b);

  const handleInfoOpenBtn = () => {
    if (remainderClass === "info_remainder") {
      setArrowImg(upArrow);
      setCloseText("닫기");
      return setRemainderClass("open");
    }

    if (remainderClass === "open") {
      setArrowImg(downArrow);
      setCloseText("");
      return setRemainderClass("info_remainder");
    }
  };

  return (
    <section className="order_total_info">
      {isPc && (
        <div className="order_item_info">
          <h2 className="info_header">
            주문상품 정보 / 총 <span className="total">{items.length}</span>개
          </h2>
          <ul className="info_group">
            {items.map((item) => (
              <li key={item.variant_id} className="info_list_wrap">
                <Link
                  to={`/products/${item.product_id}`}
                  className="info_list_box"
                >
                  <img className="info_list_img" alt="" src={item.image_src} />
                </Link>

                <div className="list_info">
                  <div className="list_info_text infoHead">
                    <label className="list_info_name" htmlFor="itemName">
                      제품명
                    </label>
                    <p className="list_goods name" id="itemName">
                      {item.product_name}
                    </p>
                  </div>

                  <div className="list_info_text">
                    <label className="list_info_name opt" htmlFor="itemOption">
                      옵션 :{" "}
                    </label>
                    <p className="list_goods option" id="itemOption">
                      {item.variant_name}
                    </p>
                  </div>

                  <div className="list_info_text priceAndQuantity">
                    <label
                      className="list_info_name pAndq"
                      htmlFor="priceAndQuantity"
                    >
                      가격 / 수량
                      <span
                        className="list_price_quantity"
                        id="priceAndQuantity"
                      >
                        {" "}
                        {item.quantity}
                      </span>
                      개
                    </label>
                    <p className="list_price_text">
                      <span className="list_price_dollar"></span>
                      <span className="list_goods price">
                        {item.variant_price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </span>
                      원
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isTablet && (
        <div className="order_item_info">
          <div className="total_info_head_wrap">
            <h2 className="info_header">주문상품 정보</h2>
            <div className="info_head_quantity">
              <span className="total_quantity_text">
                총 수량 <em className="item_total_quantity">{sum}</em>개
              </span>
            </div>
          </div>
          <ul className="info_group">
            {
              <li key={firstItem.variant_id} className="info_list_wrap">
                <div className="list_info">
                  <div className="list_info_text infoHead">
                    <p className="list_goods name">{firstItem.product_name}</p>
                  </div>

                  <div className="list_info_text">
                    <p className="list_goods option">
                      {firstItem.variant_name}
                    </p>
                  </div>

                  <div className="list_info_text priceAndQuantity">
                    <p className="list_price_text">
                      <span className="list_price_dollar"></span>
                      <span className="list_goods price">
                        {firstItem.variant_price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        원
                      </span>

                      <span className="list_price_quantity">
                        / 수량 {firstItem.quantity}개
                      </span>
                    </p>
                  </div>
                </div>

                <Link
                  to={`/products/${firstItem.product_id}`}
                  className="info_list_box"
                >
                  <img
                    className="info_list_img"
                    alt=""
                    src={firstItem.image_src}
                  />
                </Link>
              </li>
            }
            <div className={remainderClass}>
              {remainder.map((item) => (
                <li key={item.variant_id} className="info_list_wrap">
                  <div className="list_info">
                    <div className="list_info_text infoHead">
                      <p className="list_goods name">{item.product_name}</p>
                    </div>

                    <div className="list_info_text">
                      <p className="list_goods option">{item.variant_name}</p>
                    </div>

                    <div className="list_info_text priceAndQuantity">
                      <p className="list_price_text">
                        <span className="list_price_dollar"></span>
                        <span className="list_goods price">
                          {item.variant_price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          원
                        </span>

                        <span className="list_price_quantity">
                          / 수량 {item.quantity}개
                        </span>
                      </p>
                    </div>
                  </div>

                  <Link
                    to={`/products/${item.product_id}`}
                    className="info_list_box"
                  >
                    <img
                      className="info_list_img"
                      alt=""
                      src={item.image_src}
                    />
                  </Link>
                </li>
              ))}
            </div>
            {items.length > 1 ? (
              <button
                type="button"
                className="info_all_btn"
                onClick={handleInfoOpenBtn}
              >
                <span className="info_all_btn_text">
                  총{" "}
                  <strong className="order_item_length">
                    {items.length}건{" "}
                  </strong>{" "}
                  전체보기 {closeText}
                </span>
                <img
                  src={arrowImg}
                  alt="buttonArrow"
                  className="info_all_btn_arrow"
                />
              </button>
            ) : (
              ""
            )}
          </ul>
        </div>
      )}

      {isMobile && (
        <div className="order_item_info">
          <div className="total_info_head_wrap">
            <h2 className="info_header">주문상품 정보</h2>
            <div className="info_head_quantity">
              <span className="total_quantity_text">
                총 수량 <em className="item_total_quantity">{sum}</em>개
              </span>
            </div>
          </div>

          <ul className="info_group">
            {
              <li key={firstItem.variant_id} className="info_list_wrap">
                <div className="list_info">
                  <div className="list_info_text infoHead">
                    <p className="list_goods name">{firstItem.product_name}</p>
                  </div>

                  <div className="list_info_text">
                    <p className="list_goods option">
                      {firstItem.variant_name}
                    </p>
                  </div>

                  <div className="list_info_text priceAndQuantity">
                    <p className="list_price_text">
                      <span className="list_price_dollar"></span>
                      <span className="list_goods price">
                        {firstItem.variant_price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        원
                      </span>

                      <span className="list_price_quantity">
                        / 수량 {firstItem.quantity}개
                      </span>
                    </p>
                  </div>
                </div>

                <Link
                  to={`/products/${firstItem.product_id}`}
                  className="info_list_box"
                >
                  <img
                    className="info_list_img"
                    alt=""
                    src={firstItem.image_src}
                  />
                </Link>
              </li>
            }
            <div className={remainderClass}>
              {remainder.map((item) => (
                <li key={item.variant_id} className="info_list_wrap">
                  <div className="list_info">
                    <div className="list_info_text infoHead">
                      <p className="list_goods name">{item.product_name}</p>
                    </div>

                    <div className="list_info_text">
                      <p className="list_goods option">{item.variant_name}</p>
                    </div>

                    <div className="list_info_text priceAndQuantity">
                      <p className="list_price_text">
                        <span className="list_price_dollar"></span>
                        <span className="list_goods price">
                          {item.variant_price
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          원
                        </span>

                        <span className="list_price_quantity">
                          / 수량 {item.quantity}개
                        </span>
                      </p>
                    </div>
                  </div>

                  <Link
                    to={`/products/${item.product_id}`}
                    className="info_list_box"
                  >
                    <img
                      className="info_list_img"
                      alt=""
                      src={item.image_src}
                    />
                  </Link>
                </li>
              ))}
            </div>
            {items.length > 1 ? (
              <button
                type="button"
                className="info_all_btn"
                onClick={handleInfoOpenBtn}
              >
                <span className="info_all_btn_text">
                  총{" "}
                  <strong className="order_item_length">
                    {items.length}건{" "}
                  </strong>{" "}
                  전체보기 {closeText}
                </span>
                <img
                  src={arrowImg}
                  alt="buttonArrow"
                  className="info_all_btn_arrow"
                />
              </button>
            ) : (
              ""
            )}
          </ul>
        </div>
      )}

      {isPc && (
        <OrderTotalDetail
          totalPrice={totalPrice}
          deliveryCharge={deliveryCharge}
          usedMileage={usedMileage}
          selectOption={selectOption}
          handleOrderSubmit={handleOrderSubmit}
          isPc={isPc}
          isTablet={isTablet}
          isMobile={isMobile}
        />
      )}
    </section>
  );
};

export default OrderTotal;
