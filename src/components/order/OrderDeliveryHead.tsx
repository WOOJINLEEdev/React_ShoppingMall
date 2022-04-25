import { useRecoilValue } from "recoil";
import { OrderDeliveryHeadProps } from "types";
import { deliveryInfoState } from "./OrderDeliveryForm";

const OrderDeliveryHead = ({
  isPc,
  isTablet,
  isMobile,
  deliveryWrite,
  infoHeadAddress,
  checkoutData,
  handleAddressBtnClick,
  arrowImg,
}: OrderDeliveryHeadProps) => {
  const deliveryStateValue = useRecoilValue(deliveryInfoState(checkoutData.id));

  return (
    <div className="info_head_wrap">
      <h2 className="info_head delivery">배송정보</h2>
      {isPc && (
        <div className="info_head_sub">
          <span className="vital">*</span>표시는 필수입력 항목
        </div>
      )}

      {isTablet && (
        <div className="info_head_address_wrap">
          {deliveryWrite === "신규 입력" ||
          !checkoutData.user?.shipping_address ? (
            <div className={infoHeadAddress}>
              {deliveryStateValue.address1 && deliveryStateValue.addressDetail1}{" "}
              {deliveryStateValue.addressDetail2}
            </div>
          ) : (
            <div className={infoHeadAddress}>
              {checkoutData?.user?.shipping_address?.address1}{" "}
              {checkoutData?.user?.shipping_address?.address2}
            </div>
          )}
          <button
            type="button"
            className="address_btn"
            onClick={handleAddressBtnClick}
          >
            <img src={arrowImg} alt="buttonArrow" className="address_btn_img" />
          </button>
        </div>
      )}

      {isMobile && (
        <div className="info_head_address_wrap">
          {deliveryWrite === "신규 입력" ||
          !checkoutData.user?.shipping_address ? (
            <div className={infoHeadAddress}>
              {deliveryStateValue.address1 && deliveryStateValue.addressDetail1}{" "}
              {deliveryStateValue.addressDetail2}
            </div>
          ) : (
            <div className={infoHeadAddress}>
              {checkoutData?.user?.shipping_address?.address1}{" "}
              {checkoutData?.user?.shipping_address?.address2}
            </div>
          )}
          <button
            type="button"
            className="address_btn"
            onClick={handleAddressBtnClick}
          >
            <img src={arrowImg} alt="buttonArrow" className="address_btn_img" />
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderDeliveryHead;
