import {React, useState, useEffect} from 'react';
import { Line } from 'react-chartjs-2';
// eslint-disable-next-line
import Chart from 'chart.js/auto';
import "./Graph.css";

export default function Graph() {
  const [dailyData, setDailyData] = useState([]);
  const [year, setYear] = useState(2019);
  const [month, setMonth] = useState(0);
  const [tempDatas, settempDatas] = useState([]);

  const monthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [selectYear, setselectYear] = useState(false);
  const [isLoading,setisLoading] = useState(false);
   useEffect(() => {
     setisLoading(true);
     setTimeout(()=>{
      setisLoading(false);
    },500);
    const fetchLocation = async() => {
      await fetch("https://magenta-marshmallow-f6fee2.netlify.app/db.json")
      .then((resp) => resp.json())
      .then((res) => {
        console.log("this is data", res.data);
        settempDatas(res.data);
      });
     }
     fetchLocation();
  }, []);

  useEffect(()=>{
    const tempYears = tempDatas.filter((tempData)=>{
      var y =  new Date(tempData.date).getFullYear();
      return(y === year);
   });
   const tempMonths = tempYears.filter((tempYear)=>{
     var m = new Date(tempYear.date).getMonth();
     return(m === month);
   });
   const newData = tempMonths.map(({date,new_cases,total_cases})=>({date:date,new_cases:new_cases,total_cases:total_cases}));
   var stringified = JSON.stringify(newData);
   var parsedObj = JSON.parse(stringified);
   setDailyData(parsedObj);
  },[year, month,tempDatas]);

 console.log("Daily data", dailyData);
const lineChart = (
  dailyData[0] ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
        datasets: [{
          data: dailyData.map(({new_cases}) => new_cases),
          label: 'New Cases',
          borderColor: 'blue',
          backgroundColor: '#ADD8E6',
          fill: true,
        },
        {
          data: dailyData.map(({total_cases}) => total_cases),
          label: 'Total Cases',
          borderColor: 'Red',
          backgroundColor: ' #FF7F7F',
          fill: true,
        },
        ],
      }}
    />) :
    <div className='notFound'>
      <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFqvNPM-v1_ErZfSDFpiKAzWpa-AFhyjvHog&usqp=CAU' alt="notFound"></img>
    </div>
  );
  const handleYear = (e)=>{
    setYear(e.target.value);
    setselectYear(true);
  }
  const handleMonth = (e)=>{
    console.log("mnothname", e.target.title);
    setMonth(e.target.value);
  }
  console.log(isLoading);
  return (
  <>
<div className='ParentContainer'>
<div className="GraphContainer">
<div className='heading'>
    <h1>Covid Report for {monthName[month]} {year}</h1>
</div>
  <div>
    {!isLoading ?
    <div>{lineChart}</div>:
    <div>
    <img src='https://c.tenor.com/tEBoZu1ISJ8AAAAC/spinning-loading.gif' alt="loading..."></img>
    </div>
    }
  </div>
</div>
<div className='selectContainer'>
<div className='YearContainer'>
  <select id="year" name="year" onChange={e => {handleYear(e)} }>
    <option className="option"  title=""  value="2019">2019</option >
    <option className="option"  title=""  value="2020">2020</option >
    <option className="option"  title=""  value="2021">2021</option >
    <option className="option"  title=""  value="2022">2022</option >
 </select>
</div>
<div className='MonthContainer' >
 <select id="month" onChange={e => {handleMonth(e)}} disabled = {!selectYear}>
 <option  className="option" title="January"  value="0" >January</option >
 <option className="option"  title="February"  value="1">February</option >
 <option className="option"  title="March"  value="2">March</option >
 <option className="option"  title="April"  value="3">April</option >
 <option className="option"  title="May"  value="4">May</option >
 <option className="option"  title="June"  value="5">June</option >
 <option className="option"  title="July"  value="6">July</option >
 <option className="option"  title="August"  value="7">August</option >
 <option className="option"  title="September"  value="8">September</option >
 <option className="option"  title="October"  value="9">October</option >
 <option className="option"  title="November"  value="10">November</option >
 <option className="option"  title="December"  value="11">December</option >
</select>
</div>
</div>
</div>
  </>
  )
}
