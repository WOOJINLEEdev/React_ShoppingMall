// import React, { Component } from "react";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Clock = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const getDate = () => {
      setDate(new Date());
    };

    const refreshInterval = setInterval(() => getDate(), 1000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  const getDayOfWeek = (day) => {
    switch (day) {
      case 0:
        return "일요일";
      case 1:
        return "월요일";
      case 2:
        return "화요일";
      case 3:
        return "수요일";
      case 4:
        return "목요일";
      case 5:
        return "금요일";
      case 6:
        return "토요일";
      default:
        throw new Error(`not supported day: ${day}`);
    }
  };

  return (
    <Container className="main_clock">
      <CurGroup className="clock_group">
        <CurDate>
          {date.getFullYear()}&nbsp;/&nbsp;
          {date.getMonth() < 9
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1}
          &nbsp;/&nbsp;
          {date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}
        </CurDate>
        <CurDay>{getDayOfWeek(date.getDay())}</CurDay>
        <CurTime>
          {date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}
          &nbsp;:&nbsp;
          {date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}
          &nbsp;:&nbsp;
          {date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()}
        </CurTime>
      </CurGroup>
    </Container>
  );
};

export default Clock;

const Container = styled.div`
  width: 1024px;
  height: 30px;
  line-height: 30px;
  margin: 10px auto;
  text-align: center;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: 100%;
    margin: 0;
    height: 35px;
    line-height: 35px;
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    width: 100%;
    margin: 0;
    height: 40px;
    line-height: 40px;
  }
`;

const CurGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
  line-height: 30px;
  margin: 0 auto;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    margin: 0 auto;
    line-height: 35px;
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    margin: 0 auto;
    line-height: 40px;
  }
`;

const CurDate = styled.div`
  font-size: 15px;
`;

const CurDay = styled.div`
  font-style: italic;
`;

const CurTime = styled.div`
  font-size: 15px;
  font-weight: bold;
`;