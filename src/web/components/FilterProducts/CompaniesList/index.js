import React from 'react'
import FormContainer, { CheckBox } from '../../FormContainer'

const CompanyItem = (company, productsCount, index, checked, onChange) => (
  <CheckBox
    key={index}
    name={company}
    label={`${company} (${productsCount})`}
    checked={checked}
    onChange={onChange}
  />
)

const CompaniesList = ({ list, stateList, onChange }) => {
  return (
    <FormContainer label="Sellers">
      {list.map(({ company, productsCount }, index) => {
        const isChecked = stateList[company]
        return CompanyItem(company, productsCount, index, isChecked, onChange)
      })}
    </FormContainer>
  )
}

export default CompaniesList
