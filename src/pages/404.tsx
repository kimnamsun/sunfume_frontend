import React from 'react';
import { Page, Navbar, Block } from 'framework7-react';
import DefaultTitle from '@components/DefaultTitle';

const NotFoundPage = () => (
  <Page>
    <Navbar title="Not found" backLink="Back" />
    <DefaultTitle />
    <Block strong>
      <p className="text-align-center mt-10">페이지를 찾을 수 없습니다.</p>
    </Block>
  </Page>
);

export default NotFoundPage;
