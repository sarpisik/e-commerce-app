import React from 'react'
import { Pagination } from 'react-bootstrap'
import * as ROUTES from '../../../constants/routes'
import Redirect from '../../Redirect'
import './index.css'

export default ({ refCallback, title, searchQuery, children, onScroll }) => (
  <div
    ref={refCallback}
    className="custom-container-category overflow-hidden col-sm-12">
    <div className="header-link bg-white rounded-top p-2">
      <h2 style={{ paddingRight: '1rem' }} className="d-inline-block m-0">
        {title}
      </h2>
      <Redirect
        text="Shop now"
        pathname={ROUTES.CATEGORY}
        search={searchQuery}
      />
    </div>
    <div className="custom-row-category">
      <div className="d-flex flex-row flex-nowrap card-group">
        <Pagination>
          <Pagination.Prev className="prev" onClick={() => onScroll(false)} />
          {children}
          <Pagination.Next className="next" onClick={() => onScroll(true)} />
        </Pagination>
      </div>
    </div>
  </div>
)
