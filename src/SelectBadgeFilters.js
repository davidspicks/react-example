import React from 'react'
//https://react-select.com/home
//$ npm i react-select
import Select from 'react-select'

export default function SelectBadgeFilters({ filters, setFilters }) {
    //HACK!! TODO: initialize badge list dynamically from post.json file data
    const badgeFilterOptions = [
      { value: 'Free Admission', label: 'Free' }
     , { value: 'Kid Friendly', label: 'Kids' }
     , { value: 'Beer Garden', label: 'Beer' }
     , { value: 'Wine Tasting', label: 'Wine' }
     , { value: 'Pet Friendly', label: 'Pets' }
    ]
  
    function handleBadgeFilter(e){
      //save state
      if (e) setFilters(e)
      else setFilters([])
    }
  
  return (      <Select 
    id="badge-filters"
    options={badgeFilterOptions}
    onChange={handleBadgeFilter}
    isMulti
    value={filters}
  />
)
}
