import React from 'react'
import { Card } from 'react-bootstrap'
import { SideBarList } from '../..'
import { navigateCategoriesList } from '../../Helpers'

const SlideCategoriesList = ({ categoriesList }) => (
  <Card className="d-flex flex-column h-100 rounded-0">
    <Card.Header>CATEGORIES</Card.Header>
    <SideBarList
      handleClick={navigateCategoriesList}
      className="flex-grow-1"
      variant="flush"
      list={categoriesList}
    />
  </Card>
)

export default SlideCategoriesList
