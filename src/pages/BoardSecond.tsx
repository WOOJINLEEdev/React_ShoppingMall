import { useState, useEffect, lazy, Suspense, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Modal from "react-modal";
import { useRecoilState } from "recoil";

import useBoardList from "hooks/api/useBoardList";
import useDevice from "hooks/useDevice";
import { getToken } from "utils/token";
import { formatDate } from "utils/date";

import BoardTable from "components/board/BoardTable";
import BoardTableRow from "components/board/BoardTableRow";
import BoardTableColumn from "components/board/BoardTableColumn";
import BoardPagination from "components/board/BoardPagination";
import SearchInputBtn from "components/search/SearchInputBtn";
import Loading from "components/common/Loading";
import ErrorMessage from "components/common/ErrorMessage";

import { curBoardState } from "state";

Modal.setAppElement("#root");

const BoardItemModal = lazy(() => import("components/board/BoardItemModal"));

const HEADER_NAME = ["번호", "제목", "작성자", "등록일", "조회수", "미리보기"];

interface IPosts {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const BoardSecond = () => {
  const navigate = useNavigate();
  const { isPc, isTablet, isMobile } = useDevice();
  const detectMobile = detectMobileDevice();

  const [pageState, setPageState] = useRecoilState(curBoardState("second"));

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [posts, setPosts] = useState<IPosts[]>([]);
  const [selectedPreviewId, setSelectedPreviewId] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [mobileLimit, setMobileLimit] = useState<number>(20);
  const [page, setPage] = useState<number>(pageState.pageNumber);
  const [searchClassName, setSearchClassName] = useState<string>("search_wrap");
  const [searchInputClassName, setsearchInputClassName] =
    useState<string>("board_search_input");
  const [searchBtnClassName, setsearchBtnClassName] =
    useState<string>("board_search_btn");

  const offset =
    detectMobile === true ? (page - 1) * mobileLimit : (page - 1) * limit;
  const offsetLimit =
    detectMobile === true ? offset + mobileLimit : offset + limit;

  const token = getToken();
  const date = new Date();
  let searchInput = "";

  const { boardList, boardListError } = useBoardList();

  useEffect(() => {
    detectMobileDevice();

    localStorage.setItem("board", "second");
  }, []);

  useEffect(() => {
    setPageState({ ...pageState, pageNumber: page });
  }, [page]);

  useEffect(() => {
    if (boardList) {
      const reverseData = JSON.parse(JSON.stringify(boardList)).reverse();
      setPosts(reverseData);
    }
  }, [boardList]);

  if (!boardList) return <Loading />;
  if (boardListError) return <ErrorMessage />;

  function detectMobileDevice() {
    const minWidth = 500;

    return window.innerWidth <= minWidth;
  }

  const handleWriteBtnClick = () => {
    if (token) {
      navigate("/boardPost");
    } else {
      alert("로그인 후 이용해주세요!");
      return false;
    }
  };

  const handlePreviewBtnClick = (itemId: number) => {
    setSelectedPreviewId(itemId);
    setIsOpen(true);
  };

  const onRequestClose = () => {
    setIsOpen(false);
  };

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;
    searchInput = targetValue;
  };

  const handleSearchBtnClick = () => {
    const searchFilter = posts.filter((item) =>
      item.title.includes(searchInput)
    );
    console.log(searchFilter);
  };

  const getHeadersName = () => {
    if (isTablet) {
      return ["번호", "제목", "작성자", "등록일", "조회수"];
    }
    if (isMobile) {
      return ["번호", "제목", "작성자", "등록일"];
    }

    return HEADER_NAME;
  };

  return (
    <BoardWrap>
      <h2 className="board_second_head">
        커뮤니티 (Board {localStorage.getItem("board")})
      </h2>
      <div className="board_write_wrap">
        <SearchInputBtn
          searchClassName={searchClassName}
          searchInputClassName={searchInputClassName}
          searchBtnClassName={searchBtnClassName}
          handleSearchBtnClick={handleSearchBtnClick}
          handleSearchInputChange={handleSearchInputChange}
        />
        <button
          type="button"
          className="board_write_btn"
          onClick={handleWriteBtnClick}
        >
          글쓰기
        </button>
      </div>
      <Suspense fallback={<Loading />}>
        <BoardItemModal
          boardItemId={selectedPreviewId}
          isOpen={isOpen}
          onRequestClose={onRequestClose}
        />
      </Suspense>

      <BoardTable headersName={getHeadersName()} boardLocal="second">
        {posts.slice(offset, offsetLimit).map((item, i) => (
          <BoardTableRow key={`table_row_${i}`}>
            <BoardTableColumn>{item.id}</BoardTableColumn>
            <BoardTableColumn title={item.title}>
              <Link to={`/postView/${item.id}`} className="board_link">
                <span className="board_item_title">{item.title}</span>
              </Link>
            </BoardTableColumn>
            <BoardTableColumn>{item.userId}</BoardTableColumn>
            {isMobile && (
              <BoardTableColumn>{formatDate(date, "MM-DD")}</BoardTableColumn>
            )}
            {isTablet && (
              <BoardTableColumn>{formatDate(date)}</BoardTableColumn>
            )}
            {isPc && <BoardTableColumn>{formatDate(date)}</BoardTableColumn>}
            {isTablet && <BoardTableColumn>{item.id}</BoardTableColumn>}
            {isPc && <BoardTableColumn>{item.id}</BoardTableColumn>}
            {isPc && (
              <BoardTableColumn>
                <button
                  type="button"
                  className="board_preview_btn"
                  onClick={() => handlePreviewBtnClick(item.id)}
                >
                  <span className="visually_hidden">미리보기</span>
                </button>
              </BoardTableColumn>
            )}
          </BoardTableRow>
        ))}
      </BoardTable>
      <BoardPagination
        total={posts.length}
        limit={detectMobile === true ? mobileLimit : limit}
        page={page}
        setPage={setPage}
      />
    </BoardWrap>
  );
};

export default BoardSecond;

const BoardWrap = styled.div`
  width: 984px;
  min-height: calc(100vh - 271px);
  height: 100%;
  margin: 0 auto;
  padding: 50px 20px;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: calc(100% - 40px);
    min-height: calc(100vh - 251px);
    height: 100%;
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    width: calc(100% - 100px);
  }
`;
