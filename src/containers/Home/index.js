import React, { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Layout from "antd/lib/layout";
import Spin from "antd/lib/spin";
import Input from "antd/lib/input";
import notification from "antd/lib/notification";
import { ListImages } from "../../components";
import { getListImages } from "../../services";
import { ITEMS_PER_PAGE, SEARCH_INTERVAL } from "../../utils/constants";
import "./styles.scss";

const { Header, Content } = Layout;
const HomePage = () => {
  const history = useHistory();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [listImagesData, setListImagesData] = useState({});
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const searchTimeout = useRef();
  const handleGetListImages = (params) => {
    if (params.query) {
      setLoading(true);
      getListImages({
        per_page: ITEMS_PER_PAGE,
        ...params,
      })
        .then((data) => {
          const urlSearchParams = new URLSearchParams(params);

          history.replace({
            pathname: location.pathname,
            search: urlSearchParams.toString(),
          });
          setListImagesData(data);
        })
        .catch(() =>
          notification.error({
            message: "Error",
            description: "Something went wrong!",
          })
        )
        .finally(() => setLoading(false));
    } else {
      history.replace({ pathname: location.pathname });
      setListImagesData({});
    }
  };
  const handleQueryChange = (e) => {
    const query = e.target.value;

    setQuery(query);
    setPage(1);
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    searchTimeout.current = setTimeout(() => {
      handleGetListImages({
        query,
        page: 1,
      });
    }, SEARCH_INTERVAL);
  };
  const handlePageChange = (page) => {
    setPage(page);
    handleGetListImages({
      query,
      page,
    });
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query");
    const page = params.get("page");

    setQuery(query);
    setPage(page);
    handleGetListImages({
      query,
      page,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout className="page-layout">
      <Header className="page-header">
        <h1 className="page-header-title" data-title="SWAT UNSPLASH TAKE HOME">
          SWAT UNSPLASH TAKE HOME
        </h1>
      </Header>
      <Content className="page-content">
        <div className="page-content-container">
          <Input
            placeholder="Type something to search for image"
            value={query}
            onChange={handleQueryChange}
          />
        </div>
        {loading ? (
          <div className="page-content-loading">
            <Spin />
          </div>
        ) : (
          <div className="page-content-container">
            <ListImages
              listImagesData={listImagesData}
              currentPage={Number(page)}
              onPaging={handlePageChange}
            />
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default HomePage;
