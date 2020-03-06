import * as React from 'react'
var picksObj = require("./picks_content.json")

//render badge collection for an event
function listBadges (badge) {
  return <span className="Badge" key={badge.id}>
  <img src={badge.image} 
    className="badge" 
    alt={badge.name} 
    style={{width: '18px', height: '18px'}}
  />
  </span>
}

//render info link collection for an event
function listLinks (link) {
  return <span key={link.id}>
  <a
    className="InfoLink"
    href={link.URL}
    target="_blank"
    rel="noopener noreferrer"
  >
    {link.name}
  </a>  
</span>
}

//render a single event
function listEvents (event) {
  let sponsor;
  if (event.sponsor === "")
  {
    sponsor=<></>
  }else{
    sponsor=
    <div className="Sponsor">(<a
      className="SponsorLink"
      href={event.sponsorURL}
      target="_blank"
      rel="noopener noreferrer"
    >
      {event.sponsor}
    </a>)  </div>
  }

  var msWk = 1000*60*60*24*7
  var Date2=new Date();
  var Date2Ms = Date2.getTime()
  Date2Ms += (1 * msWk) // Offset by 1 wk
  Date2.setTime( Date2Ms );

  //show dates for events > 1 week
  let dates;
  if (Date.parse(event.startDate) < Date2)
  {
    dates=<></>
  }else{
    dates=<span className="Dates"><br></br>{event.startDate} To {event.endDate}</span>
  }
  
  /*
  let dateformat = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  //prepare date for rendering
  var date1 = Date.parse(event.startDate)
  var date1Displ = new Date()
  date1Displ.setTime(date1)
  var date2 = Date.parse(event.endDate)
  var date2Displ = new Date()
  date2Displ.setTime(date2)
  */
return <div className="Event" key = {event.id}>
  <strong><a   
    className="Title-link"
    href={event.titleURL}
    target="_blank"
    rel="noopener noreferrer"
  >
    {event.title}
  </a></strong>
  <span className="Badges">{event.badges.map(listBadges)}</span>
  {dates}
  <br></br><span className="Description" 
    dangerouslySetInnerHTML={{__html:event.description}}>
  </span>
  <span className="InfoLinks">{event.links.map(listLinks)}</span>
  {sponsor}
</div>
}

export default function Picks({ filters, dateRange }){

  //filter events containing user selected badges
  function hasBadge(event){
  //return all when no filters checked
  if (filters.length === 0)
    return true;
  //loop through badges and return true if match to a checked filter
  for (var i = 0; i < event.badges.length; i++) {
      //console.log('name'+ event.badges[i].name)
      for (var j = 0; j < filters.length; j++) {
      if (event.badges[i].name.includes(filters[j].value)) {
        return true;
      }
    }
  }
    //no match for checked filters
    return false;
  }

  //https://developer.mozilla.org/en-US/docs/web/javascript/reference/global_objects/date/tolocalestring
  let dateformat = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  //arithemetic for date range filter
  var msWk = 1000*60*60*24*7
  var Date1 = new Date()
  var Date2=new Date();
  var Date2Ms = Date2.getTime()
  if (dateRange.value)
    Date2Ms += (dateRange.value * msWk) // Offset by n week(s)
  else
    Date2Ms += (1 * msWk) // Offset by 1 wk
  Date2.setTime( Date2Ms );

  function inDateRange(event){
    Date1 = Date.parse(event.startDate)
    //if ( Date.parse(event.startDate) < Date.parse(picksObj.fromDate)+(dateRange.value * msWk))
    if ( Date1 < Date2)
      return true
  }

  //prepare date for rendering
  var dateDispl = new Date()
  dateDispl.setTime(Date1)
  //console.log(dateDispl)

  var eventsFiltered1 = picksObj.Events.filter(hasBadge)
  var eventsFiltered2 = eventsFiltered1.filter(inDateRange)

  return (
    <div>
      <h2>{picksObj.Heading}</h2>
      <h3>Filtered List: {dateDispl.toLocaleString('en-us', dateformat)} To {Date2.toLocaleString('en-us', dateformat)}</h3>
      <span>{eventsFiltered2.length} Events</span>
     {eventsFiltered2.map(listEvents)}
       <h3>Unfiltered List</h3>
       <span>{picksObj.Events.length} Events</span>
     {picksObj.Events.map(listEvents)}
     </div>
    
  ) 
}
