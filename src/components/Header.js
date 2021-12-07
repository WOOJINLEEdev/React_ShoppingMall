import React, { useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import signInImg from "../images/user.png";
import useMyCart from "../hooks/useMyCart";
import useMenuCollapsed from "../hooks/useMenuCollapsed";
import useSearch from "../hooks/useSearch";
import useSearchLocation from "../hooks/useSearchLocation";
import useSearchResult from "../hooks/useSearchResult";
import { ReactComponent as MenuImg } from "../images/menu.svg";
import { GoSearch } from "react-icons/go";
import { FiShoppingCart } from "react-icons/fi";
import { instance } from "../utils/http-client";
import useActiveHeaderItem from "../hooks/useActiveHeaderItem";
import { GrHomeRounded } from "react-icons/gr";
import { RiLoginBoxLine } from "react-icons/ri";

const Header = ({ location }) => {
  const isPc = useMediaQuery({ query: "(min-width:1024px)" });
  const token = localStorage.getItem("token");
  const history = useHistory();

  useEffect(() => {
    instance
      .put("/v1/me/visit", null)
      .then(function (response) {
        console.log(response);
        console.log("visit", response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const { cart, loadingCart, cartError, mutateCart } = useMyCart();
  const { data, mutate } = useMenuCollapsed();
  const { searchData, searchMutate } = useSearch();
  const { searchLocationData, searchLocationMutate } = useSearchLocation();
  const { searchResultData, searchResultMutate } = useSearchResult();
  const { clickedData, clickedMutate } = useActiveHeaderItem();

  if (cartError) return "에러 발생...";
  if (loadingCart) return "로딩중...";

  const cartAmount = cart.items.length;

  const handleMenuClick = () => {
    mutate(!data);
  };

  const handleSearchClick = () => {
    searchMutate(!searchData);

    console.log("검색버튼클릭", location.pathname);
    searchLocationMutate(location.pathname);
  };

  const handleHeaderTitleClick = () => {
    history.push("/");
    clickedMutate("");
  };

  const handleHeaderAboutClick = () => {
    history.push("/aboutMe");
  };

  const handleHeaderSignInClick = () => {
    const path = !token ? "/login" : "/mypage";
    history.push(path);
  };

  const handleHeaderCartClick = () => {
    history.push("/cart");
  };

  return (
    <header className="header">
      <MenuHomeWrap>
        <MenuWrap
          onClick={handleMenuClick}
          tabIndex="0"
          onKeyPress={handleMenuClick}
        >
          <MenuImg />
        </MenuWrap>

        <HeaderTitle
          className="header_link"
          onClick={handleHeaderTitleClick}
          onKeyPress={handleHeaderTitleClick}
          tabIndex="0"
        >
          <h1 className="header_title">WJ Shop</h1>
        </HeaderTitle>
      </MenuHomeWrap>

      <nav>
        <SignCartWrap>
          {isPc && (
            <HeaderSearch
              onClick={handleSearchClick}
              onKeyPress={handleSearchClick}
              tabIndex="0"
              className={clickedData === "search" ? "headerClicked" : ""}
            >
              <GoSearch />
              <span className="visually_hidden">검색</span>
            </HeaderSearch>
          )}
          {isPc && (
            <HeaderAbout
              className={clickedData === "/aboutMe" ? "headerClicked" : ""}
              onClick={handleHeaderAboutClick}
              onKeyPress={handleHeaderAboutClick}
              tabIndex="0"
            >
              <GrHomeRounded />
            </HeaderAbout>
          )}

          <HeaderSignIn
            className={
              clickedData === "/mypage" || clickedData === "/login"
                ? "headerClicked"
                : ""
            }
            onClick={handleHeaderSignInClick}
            onKeyPress={handleHeaderSignInClick}
            tabIndex="0"
          >
            {!token ? (
              <RiLoginBoxLine />
            ) : (
              <img src={signInImg} className="signin_img" alt="sign_in"></img>
            )}
            <span className="visually_hidden">로그인</span>
          </HeaderSignIn>

          <HeaderCart
            className={clickedData === "/cart" ? "headerClicked" : ""}
            onClick={handleHeaderCartClick}
            onKeyPress={handleHeaderCartClick}
            tabIndex="0"
          >
            <FiShoppingCart />
            <span className="visually_hidden">장바구니</span>
            {token && cartAmount > 0 ? (
              <CartAmount>{cartAmount}</CartAmount>
            ) : null}
          </HeaderCart>
        </SignCartWrap>
      </nav>
    </header>
  );
};

export default withRouter(Header);

const MenuHomeWrap = styled.div`
  display: flex;
  width: 210px;
  height: 80px;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    display: flex;
    width: 180px;
    height: 50px;
    margin: 0;
  }
`;

const MenuWrap = styled.div`
  display: none;
  width: 90px;
  height: 80px;
  text-align: center;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    display: inline-block;
    width: 50px;
    height: 50px;
    margin: 0;
    text-align: center;

    & svg {
      width: 20px;
      height: 20px;
      margin: 15px;
    }
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    display: inline-block;

    & svg {
      width: 30px;
      height: 30px;
      margin: 25px 30px;
    }
  }
`;

const HeaderTitle = styled.div``;

const HeaderAbout = styled.li`
  display: flex;
  width: 90px;
  height: 80px;
  flex-direction: column;
  text-align: center;
  font-weight: bold;
  justify-content: center;
  cursor: pointer;

  & svg {
    width: 32px;
    min-height: 32px;
    margin: 24px 29px;
  }
`;

const HeaderSearch = styled.li`
  display: inline-block;
  width: 90px;
  height: 80px;
  line-height: 80px;
  font-size: 16px;
  text-align: center;
  cursor: pointer;

  & svg {
    width: 32px;
    height: 32px;
    margin: 24px 29px;
  }
`;

const HeaderSignIn = styled.li`
  display: inline-block;
  width: 90px;
  height: 80px;
  line-height: 80px;
  color: #333;
  font-size: 16px;
  text-align: center;
  cursor: pointer;

  & svg {
    width: 32px;
    min-height: 32px;
    margin: 24px 29px;
  }

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: 50px;
    height: 50px;

    & svg,
    img {
      width: 20px;
      min-height: 20px;
      margin: 15px;
    }

    &:hover {
      border-bottom: 0;
    }
  }
`;

const HeaderCart = styled.li`
  display: inline-block;
  width: 90px;
  height: 80px;
  color: #333;
  line-height: 80px;
  font-size: 16px;
  text-align: center;
  cursor: pointer;

  & svg {
    width: 32px;
    height: 32px;
    margin: 24px 29px;
  }

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: 50px;
    height: 50px;

    & svg {
      width: 20px;
      height: 20px;
      margin: 15px;
    }

    &:hover {
      border-bottom: 0;
    }
  }
`;

const SignCartWrap = styled.ul`
  display: flex;
  justify-content: flex-end;
  width: 360px;
  height: 80px;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: 120px;
    height: 50px;
  }
`;

const CartAmount = styled.div`
  position: absolute;
  top: 15px;
  right: 18px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  color: #fff;
  background-color: rgb(255, 0, 0, 0.7);
  font-weight: bold;
  font-size: 15px;
  text-align: center;
  line-height: 22px;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: 16px;
    height: 16px;
    font-size: 11px;
    line-height: 16px;
    top: 7px;
    right: 7px;
  }

  @media only screen and (min-width: 768) and (max-width: 1023px) {
  }
`;