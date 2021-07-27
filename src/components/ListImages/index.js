import React from "react";
import Empty from "antd/lib/empty";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Card from "antd/lib/card";
import Avatar from "antd/lib/avatar";
import Pagination from "antd/lib/pagination";
import { TwitterOutlined, InstagramOutlined } from "@ant-design/icons";
import { ITEMS_PER_PAGE } from "../../utils/constants";
import "./styles.scss";

const { Meta } = Card;
const ListImages = ({ listImagesData, currentPage, onPaging }) => {
  const listImagesLayout = {
    xs: 12,
    sm: 12,
    md: 6,
    lg: 6,
  };
  const { total = 0, results: images = [] } = listImagesData;
  const handleOnChange = (page) => onPaging(page);

  return images.length === 0 ? (
    <Empty />
  ) : (
    <>
      <Row gutter={[12, 12]}>
        {images.map((image) => (
          <Col key={image.id} {...listImagesLayout}>
            <Card
              hoverable
              cover={
                <a href={image.links.html} target="_blank" rel="noreferrer">
                  <img src={image.urls.regular} alt={image.description} />
                </a>
              }
              actions={[
                ...(image.user.twitter_username
                  ? [
                      <a
                        href={`https://twitter.com/${image.user.twitter_username}`}
                        key="twitter"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <TwitterOutlined />
                      </a>,
                    ]
                  : []),
                ...(image.user.instagram_username
                  ? [
                      <a
                        href={`https://www.instagram.com/${image.user.instagram_username}`}
                        key="instagram"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <InstagramOutlined />
                      </a>,
                    ]
                  : []),
              ]}
            >
              <Meta
                avatar={<Avatar src={image.user.profile_image.small} />}
                title={`A photo by: ${image.user.name}`}
                description={image.description}
              />
            </Card>
          </Col>
        ))}
      </Row>
      <div className="list-pagination">
        <Pagination
          current={currentPage}
          total={total}
          defaultPageSize={ITEMS_PER_PAGE}
          onChange={handleOnChange}
        />
      </div>
    </>
  );
};

export default ListImages;
