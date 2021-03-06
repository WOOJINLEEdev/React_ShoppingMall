import { SWRInfiniteKeyLoader } from "swr/infinite";

import usePagingQuery from "hooks/api/usePagingQuery";

import ProductItem from "components/home/ProductItem";
import ProductListSkeleton from "components/home/ProductListSkeleton";
import MoreViewBtn from "components/common/MoreViewBtn";
import ErrorMessage from "components/common/ErrorMessage";

import { IProduct } from "types";

const PAGE_LIMIT = 8;

const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.length) {
    return null;
  }

  return `/v1/products?limit=${PAGE_LIMIT}&offset=${pageIndex * PAGE_LIMIT}`;
};

const ProductList = () => {
  const { data, error, size, setSize } = usePagingQuery(getKey);

  if (error) return <ErrorMessage />;
  if (!data) return <ProductListSkeleton />;

  const products = data.flat(Infinity) as IProduct[];

  function handleMoreViewBtnClick() {
    setSize(size + 1);
  }

  return (
    <>
      <ul className="list_group">
        {products.map((product: IProduct) => {
          return <ProductItem key={product.id} item={product} />;
        })}
      </ul>

      <MoreViewBtn onClick={handleMoreViewBtnClick} margin={"0 0 30px"} />
    </>
  );
};

export default ProductList;
