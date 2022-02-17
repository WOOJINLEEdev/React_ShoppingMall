import React, { useState, useEffect, useCallback } from "react";
import useCheckoutPaymentData from "hooks/useCheckoutPaymentData";
import { OrderPaymentItemProps, Payment } from "types";

const OrderPaymentItem = React.memo(
  ({
    i,
    selected,
    item,
    handlePaymentMethod,
    basePaymentClass,
    selectedPaymentClass,
  }: OrderPaymentItemProps) => {
    return (
      <li
        className={
          selected
            ? `${basePaymentClass} ${selectedPaymentClass}`
            : basePaymentClass
        }
        key={item.id}
        data-pay={i}
        value={i}
        onClick={handlePaymentMethod}
        tabIndex={0}
      >
        {item.payment}
      </li>
    );
  }
);

const OrderPaymentList = React.memo(() => {
  const payments = [
    {
      id: "1",
      payment: "신용/체크카드",
    },
    {
      id: "2",
      payment: "현대카드",
    },
    {
      id: "3",
      payment: "네이버 페이",
    },
    {
      id: "4",
      payment: "토스",
    },
    {
      id: "5",
      payment: "카카오 페이",
    },
    {
      id: "6",
      payment: "삼성 페이",
    },
    {
      id: "7",
      payment: "SSG 페이",
    },
    {
      id: "8",
      payment: "무통장 입금",
    },
    {
      id: "9",
      payment: "휴대폰 결제",
    },
    {
      id: "10",
      payment: "계좌 이체",
    },
  ];

  const [selectedPaymentIndex, setSelectedPaymentIndex] = useState<number>();
  const [paymentName, setPaymentName] = useState("");

  const basePaymentClass = "payment";
  const selectedPaymentClass = "on";

  const { MutateCheckoutPaymentData } = useCheckoutPaymentData();

  useEffect(() => {
    MutateCheckoutPaymentData({
      paymentName,
    });
  }, [paymentName]);

  const handlePaymentMethod = useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      const clickedPaymentMethodIndex = (e.target as HTMLLIElement).value;
      setPaymentName((e.target as HTMLLIElement).innerText);

      return setSelectedPaymentIndex(clickedPaymentMethodIndex);
    },
    []
  );

  return (
    <ol className="payment_method">
      {payments.map((item: Payment, i: number) => (
        <OrderPaymentItem
          key={item.id}
          item={item}
          i={i}
          selected={i === selectedPaymentIndex}
          basePaymentClass={basePaymentClass}
          selectedPaymentClass={selectedPaymentClass}
          handlePaymentMethod={handlePaymentMethod}
        />
      ))}
    </ol>
  );
});

const OrderPayments = () => {
  return (
    <section className="pay_zone">
      <div className="info_head_wrap">
        <h2 className="info_head pay">결제방법</h2>
      </div>
      <div className="payment_info_wrap">
        <OrderPaymentList />
      </div>
    </section>
  );
};

export default React.memo(OrderPayments);
