import React from 'react';
import { Segmented, Tabs, Tab, Button } from 'framework7-react';

const MoreDetail = ({ desc }) => (
  <>
    <Segmented raised className="mx-4">
      <Button tabLink="#desc" tabLinkActive>
        상세정보
      </Button>
      <Button tabLink="#review">리뷰</Button>
    </Segmented>
    <Tabs>
      <Tab id="desc" tabActive className="page-content mx-5">
        <span>{desc}</span>
      </Tab>
      <Tab id="review" className="page-content mx-5">
        <span>리뷰</span>
      </Tab>
    </Tabs>
  </>
);

export default MoreDetail;
