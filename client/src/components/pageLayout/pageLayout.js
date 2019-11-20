import React from 'react';
import style from "./pageLayout.module.scss"

function PageLayout({ children }) {
  return (
    <div className={`${style["page-wrapper"]}`}>
      {children}
    </div>
  );
}

export default PageLayout;
