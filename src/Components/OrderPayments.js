import React, { useState, useEffect } from "react";
import useCheckoutData from "../hooks/useCheckoutData";

const OrderPayments = () => {
  const [selectedPaymentIndex, setSelectedPaymentIndex] = useState("");
  const [paymentName, setPaymentName] = useState("");
  const payments = [
    "신용/체크카드",
    "현대카드",
    "네이버 페이",
    "토스",
    "페이코",
    "카카오 페이",
    "삼성 페이",
    "SSG 페이",
    "무통장 입금",
    "휴대폰 결제",
    "계좌 이체",
  ];
  const basePaymentClass = "payment";
  const selectedPaymentClass = "on";

  const { checkoutTotalData, MutateCheckoutTotalData } = useCheckoutData();

  useEffect(() => {
    MutateCheckoutTotalData({
      ...checkoutTotalData,
      paymentName,
    });
  }, [paymentName]);

  const handlePaymentMethod = (e) => {
    const clickedPaymentMethodIndex = e.target.value;
    setPaymentName(e.target.innerText);

    return setSelectedPaymentIndex(clickedPaymentMethodIndex);
  };

  return (
    <section className="pay_zone">
      <div className="info_head_wrap">
        <h2 className="info_head pay">결제방법</h2>
      </div>
      <div className="payment_info_wrap">
        <ol className="payment_method">
          {payments.map((payment, i) => (
            <li
              className={
                i === selectedPaymentIndex
                  ? `${basePaymentClass} ${selectedPaymentClass}`
                  : basePaymentClass
              }
              key={i}
              data-pay={i}
              value={i}
              onClick={handlePaymentMethod}
              tabIndex="0"
            >
              {payment}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default OrderPayments;
