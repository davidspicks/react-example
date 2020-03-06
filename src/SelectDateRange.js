import React from 'react'
//https://react-select.com/home
//$ npm i react-select
import Select from 'react-select'

export default function SelectDateRange({ dateRange, setDateRange }) {

  const dateOptions = [
    { value: '1', label: 'This Week' },
    { value: '2', label: '2 Weeks' },
    { value: '3', label: '3 Weeks' },
    { value: '4', label: '1 Month' }
  ]
  
  function handleDateRange(e){
    if (e) 
      setDateRange(e)
    else
      setDateRange('1')
    //console.log(dateRange.value)
  }

  return (    
  <Select 
    id = "select-date-range"
    defaultValue={[dateOptions[0]]} 
    options={dateOptions}
    onChange={handleDateRange}
  />
)
}
