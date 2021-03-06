import { useState, useEffect, MouseEvent, ChangeEvent } from "react";

import useDevice from "hooks/useDevice";

import downArrow from "assets/images/down-arrow.png";
import upArrow from "assets/images/up-arrow-icon.png";

import { OPTION_DATA } from "components/order/order-delivery-option-data";
import OrderDeliveryHead from "components/order/OrderDeliveryHead";
import OrderDeliveryFormPc from "components/order/OrderDeliveryFormPc";
import OrderDeliveryFormTablet from "components/order/OrderDeliveryFormTablet";
import OrderDeliveryFormMobile from "components/order/OrderDeliveryFormMobile";
import OrderDeliveryForm from "components/order/OrderDeliveryForm";

import { IOrderDeliveryProps, IDeliveryRequirementOption } from "types";

const OrderDelivery = ({ checkoutData }: IOrderDeliveryProps) => {
  const { isPc, isTablet, isMobile } = useDevice();

  const [deliveryClassName, setDeliveryClassName] = useState<string>(
    "delivery_write selected"
  );
  const [deliveryClassName1, setDeliveryClassName1] =
    useState<string>("delivery_write");
  const [deliveryForm, setDeliveryForm] = useState<string>("delivery_box_wrap");
  const [deliveryForm1, setDeliveryForm1] = useState<string>(
    "delivery_box_wrap_second hide"
  );

  const [arrowImg, setArrowImg] = useState<string>(upArrow);
  const [infoHeadAddress, setInfoHeadAddress] = useState<string>("hide");
  const [deliveryWrapClass, setDeliveryWrapClass] =
    useState<string>("delivery_wrap");
  const [deliveryWrite, setDeliveryWrite] = useState<string>("");
  const [deliveryFirstRequirementWrite, setDeliveryFirstRequirementWrite] =
    useState<string>("hide");
  const [deliverySecondRequirementWrite, setDeliverySecondRequirementWrite] =
    useState<string>("hide");

  const [deliveryFirstRequirementOption, setDeliveryFirstRequirementOption] =
    useState<IDeliveryRequirementOption[]>(OPTION_DATA);
  const [deliverySecondRequirementOption, setDeliverySecondRequirementOption] =
    useState<IDeliveryRequirementOption[]>(OPTION_DATA);

  const [requirement, setRequirement] = useState<string>("");
  const [requirement1, setRequirement1] = useState<string>("");

  useEffect(() => {
    if (!checkoutData.user.shipping_address) {
      setDeliveryClassName("delivery_write disabled");
      setDeliveryForm("delivery_box_wrap_second hide");
      setDeliveryForm1("delivery_box_wrap");
      return setDeliveryClassName1("delivery_write selected");
    }
  }, []);

  const handleDeliveryTabClick = (e: MouseEvent<HTMLUListElement>) => {
    const deliveryTabName = (e.target as HTMLUListElement).dataset.name;

    if (!checkoutData.user.shipping_address) {
      return false;
    }

    setDeliveryWrite(deliveryTabName || "");

    if (deliveryTabName === "?????? ??????") {
      setDeliveryClassName("delivery_write");
      setDeliveryClassName1("delivery_write selected");
      setDeliveryForm("delivery_box_wrap_second hide");
      setDeliveryForm1("delivery_box_wrap");
      return;
    }

    if (deliveryTabName === "?????? ?????????") {
      setDeliveryClassName("delivery_write selected");
      setDeliveryClassName1("delivery_write");
      setDeliveryForm("delivery_box_wrap");
      setDeliveryForm1("delivery_box_wrap_second hide");
    }
  };

  const handleAddressBtnClick = () => {
    if (arrowImg === upArrow) {
      if (!checkoutData.user.shipping_address || deliveryWrite === "") {
        setDeliveryForm1("delivery_box_wrap_second hide");
      }

      if (deliveryWrite === "?????? ??????") {
        setDeliveryForm1("delivery_box_wrap_second hide");
        setArrowImg(downArrow);
        setInfoHeadAddress("info_head_address");
        setDeliveryWrapClass("hide");
        return;
      }

      setArrowImg(downArrow);
      setInfoHeadAddress("info_head_address");
      setDeliveryWrapClass("hide");
      return;
    }

    if (arrowImg === downArrow) {
      if (!checkoutData.user.shipping_address || deliveryWrite === "") {
        setDeliveryForm1("delivery_box_wrap");
      }

      if (checkoutData.user.shipping_address) {
        setDeliveryForm1("delivery_box_wrap_second hide");
      }

      if (deliveryWrite === "?????? ??????") {
        setArrowImg(upArrow);
        setInfoHeadAddress("hide");
        setDeliveryForm1("delivery_box_wrap");
        setDeliveryWrapClass("delivery_wrap");
        return;
      }

      setArrowImg(upArrow);
      setInfoHeadAddress("hide");
      setDeliveryWrapClass("delivery_wrap");
    }
  };

  const handleRequirementOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const targetValue = e.target.value;

    if (
      deliveryWrite === "?????? ?????????" ||
      deliveryClassName === "delivery_write selected"
    ) {
      setRequirement(targetValue);
      if (targetValue === "?????? ??????") {
        return setDeliveryFirstRequirementWrite("delivery_requirement_write");
      }
      return setDeliveryFirstRequirementWrite("hide");
    }

    if (deliveryWrite === "?????? ??????") {
      setRequirement1(targetValue);
      if (targetValue === "?????? ??????") {
        return setDeliverySecondRequirementWrite("delivery_requirement_write");
      }
      return setDeliverySecondRequirementWrite("hide");
    }

    if (
      deliveryClassName === "delivery_write disabled" ||
      deliveryClassName1 === "delivery_write selected"
    ) {
      setRequirement1(targetValue);
      if (targetValue === "?????? ??????") {
        return setDeliverySecondRequirementWrite("delivery_requirement_write");
      }
      return setDeliverySecondRequirementWrite("hide");
    }
  };

  return (
    <section className="delivery_info">
      <OrderDeliveryHead
        isPc={isPc}
        isTablet={isTablet}
        isMobile={isMobile}
        deliveryWrite={deliveryWrite}
        infoHeadAddress={infoHeadAddress}
        checkoutData={checkoutData}
        handleAddressBtnClick={handleAddressBtnClick}
        arrowImg={arrowImg}
      />

      {isPc && (
        <OrderDeliveryFormPc
          deliveryWrapClass={deliveryWrapClass}
          handleDeliveryTabClick={handleDeliveryTabClick}
          deliveryClassName={deliveryClassName}
          deliveryClassName1={deliveryClassName1}
          checkoutData={checkoutData}
          deliveryForm={deliveryForm}
          handleRequirementOptionChange={handleRequirementOptionChange}
          deliveryFirstRequirementOption={deliveryFirstRequirementOption}
          deliveryFirstRequirementWrite={deliveryFirstRequirementWrite}
          checkoutId={checkoutData.id}
          requirement={requirement}
        />
      )}

      {isTablet && (
        <OrderDeliveryFormTablet
          deliveryWrapClass={deliveryWrapClass}
          handleDeliveryTabClick={handleDeliveryTabClick}
          deliveryClassName={deliveryClassName}
          deliveryClassName1={deliveryClassName1}
          checkoutData={checkoutData}
          deliveryForm={deliveryForm}
          handleRequirementOptionChange={handleRequirementOptionChange}
          deliveryFirstRequirementWrite={deliveryFirstRequirementWrite}
          deliveryFirstRequirementOption={deliveryFirstRequirementOption}
          checkoutId={checkoutData.id}
          requirement={requirement}
        />
      )}

      {isMobile && (
        <OrderDeliveryFormMobile
          deliveryWrapClass={deliveryWrapClass}
          handleDeliveryTabClick={handleDeliveryTabClick}
          deliveryClassName={deliveryClassName}
          deliveryClassName1={deliveryClassName1}
          checkoutData={checkoutData}
          deliveryForm={deliveryForm}
          handleRequirementOptionChange={handleRequirementOptionChange}
          deliveryFirstRequirementWrite={deliveryFirstRequirementWrite}
          deliveryFirstRequirementOption={deliveryFirstRequirementOption}
          checkoutId={checkoutData.id}
          requirement={requirement}
        />
      )}

      <OrderDeliveryForm
        deliveryForm1={deliveryForm1}
        deliveryClassName={deliveryClassName}
        deliveryClassName1={deliveryClassName1}
        checkoutId={checkoutData.id}
        handleRequirementOptionChange={handleRequirementOptionChange}
        deliverySecondRequirementOption={deliverySecondRequirementOption}
        deliverySecondRequirementWrite={deliverySecondRequirementWrite}
        requirement1={requirement1}
      />
    </section>
  );
};

export default OrderDelivery;
