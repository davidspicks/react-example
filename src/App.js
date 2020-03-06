import React, { useState, useEffect } from 'react';
// $ npm i uuid
//import uuidv4 from 'uuid/v4'
import Picks from './Picks'
// $ npm i react-select
import SelectBadgeFilters from './SelectBadgeFilters'
import SelectDateRange from './SelectDateRange'

const LOCAL_STORAGE_KEY = 'filterApp.filters'

function App() {
  const [filters, setFilters] = useState([])
   
  //called once each page load and not again due to empty array of dependencies won't change
  useEffect(() => {
    const storedFilters = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedFilters) setFilters(storedFilters)
  }, []) //empty dependecy array 

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filters))
  }, [filters])

  const [dateRange, setDateRange] = useState([])

  return (
    <>
    Show only events containing:
    <SelectBadgeFilters filters={filters} setFilters={setFilters} />
    <br></br>Show events for:
    <SelectDateRange dateRange={dateRange} setDateRange={setDateRange} />  
    <Picks filters={filters} dateRange={dateRange}/>
    </>
  )
}

export default App;