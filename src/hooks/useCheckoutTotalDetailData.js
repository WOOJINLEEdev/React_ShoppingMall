import useSWR from "swr";

function useCheckoutTotalDetailData() {
  const { data, mutate } = useSWR(
    "checkoutTotalDetailData",
    () => window.$checkoutTotalDetailData
  );

  return {
    checkoutTotalDetailData: data || {},
    MutateCheckoutTotalDetailData: ($checkoutTotalDetailData) => {
      window.$checkoutTotalDetailData = $checkoutTotalDetailData;
      return mutate();
    },
  };
}

export default useCheckoutTotalDetailData;
