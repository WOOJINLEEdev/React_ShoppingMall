import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { SWRInfiniteKeyLoader } from "swr/infinite";

import usePagingQuery from "hooks/api/usePagingQuery";
import { getProductsApi } from "api";

import ProductItem from "components/home/ProductItem";
import Loading from "components/common/Loading";
import MoreViewBtn from "components/common/MoreViewBtn";
import ErrorMessage from "components/common/ErrorMessage";

interface IProduct {
  id: number;
  images: IImages[];
  name: string;
  variants: IVariants[];
}

interface IImages {
  id: number;
  product_id: number;
  src: string;
}

interface IVariants {
  price: string;
}

const SearchResult = () => {
  const matchParams = useParams();

  const [resultCount, setResultCount] = useState<number>(0);
  const [searchWord, setSearchWord] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setSearchWord(matchParams.searchWord || "");

    async function searchProduct() {
      try {
        setIsLoading(true);
        const res = await getProductsApi({
          searchInput: matchParams.searchWord || "",
          count: true,
        });
        setResultCount(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    if (matchParams.searchWord !== searchWord) {
      searchProduct();
    }
  }, [matchParams]);

  const PAGE_LIMIT = 8;
  const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
    if (searchWord === "") {
      return null;
    }

    if (previousPageData && !previousPageData.length) {
      return null;
    }

    return `/v1/products?limit=${PAGE_LIMIT}&offset=${
      pageIndex * PAGE_LIMIT
    }&name=${searchWord}`;
  };

  const { data, error, size, setSize } = usePagingQuery(getKey);

  if (error) return <ErrorMessage />;
  if (!data) return <Loading />;

  if (isLoading) return <Loading />;

  const products = data.flat(Infinity);

  function handleMoreViewBtnClick() {
    setSize(size + 1);
  }

  return (
    <ResultWrap>
      <SearchResultTitle>
        <SearchWord>{searchWord}</SearchWord>
        <span>???????????? {resultCount}???</span>
      </SearchResultTitle>
      <ul className="list_group">
        {products.length === 0 ? (
          <NoSearchWord>?????? ????????? ????????????.</NoSearchWord>
        ) : (
          products.map((product: IProduct) => {
            return <ProductItem key={product.id} item={product} />;
          })
        )}
      </ul>
      {resultCount > 9 && size * PAGE_LIMIT < resultCount ? (
        <MoreViewBtn onClick={handleMoreViewBtnClick} margin={"0 0 30px"} />
      ) : (
        ""
      )}
    </ResultWrap>
  );
};

export default SearchResult;

const ResultWrap = styled.div`
  padding: 20px 0;
  min-height: calc(100vh - 211px);

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    padding: 10px;
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    padding: 20px;
  }
`;

const SearchResultTitle = styled.div`
  padding: 10px 0 20px;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    padding: 10px 10px 20px;
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    padding: 10px 10px 20px;
  }
`;

const SearchWord = styled.span`
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
`;

const NoSearchWord = styled.div`
  width: 100%;
  min-height: calc(100% - 40px);
  line-height: calc(100vh - 259px);
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;
