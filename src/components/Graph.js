import {React, useState, useEffect} from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import "./Graph.css";

export default function Graph() {
  const [dailyData, setDailyData] = useState([]);
  const [year, setYear] = useState(2019);
  const [month, setMonth] = useState(0);
  const [selectYear, setselectYear] = useState(false);

   useEffect(() => {
    console.log("current",year, month);
    fetch(`http://localhost:3000/IND`)
      .then((res) => res.json())
      .then((data) => {
        const tempData = data.data;
        const tempYear = tempData.filter((data)=>{
           var y =  new Date(data.date).getFullYear();
           return(y == year);
        });
        const tempMonth = tempYear.filter((data)=>{
          var m = new Date(data.date).getMonth();
          console.log("m",m, month);
          return(m == month);
        });
        console.log("tempYear",tempYear);
        console.log("tempMonth",tempMonth);
        const newData = tempMonth.map(({date,new_cases,total_cases})=>({date:date,new_cases:new_cases,total_cases:total_cases}));
        console.log("newData",newData);
        setDailyData(newData);
      });
  }, [year, month]);
const lineChart = (
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
    />
  );
  const handleYear = (e)=>{
    console.log(e.target.value);
    setYear(e.target.value);
    setselectYear(true);
  }
  const handleMonth = (e)=>{
    console.log(e.target.value);
    setMonth(e.target.value);
  }
  return (
  <>
  <div className='yearPicker'>
  <select id="year" name="year" onChange={e => {handleYear(e)} }>
    <option value="2019">2019</option>
    <option value="2020">2020</option>
    <option value="2021">2021</option>
    <option value="2022">2022</option>
 </select>
 {selectYear == true ?
 <select id="month" name="month" onChange={e => {handleMonth(e)}}>
 <option value="0">January</option>
 <option value="1">February</option>
 <option value="2">March</option>
 <option value="3">April</option>
 <option value="4">May</option>
 <option value="5">June</option>
 <option value="6">July</option>
 <option value="7">August</option>
 <option value="8">September</option>
 <option value="9">October</option>
 <option value="10">November</option>
 <option value="11">December</option>
</select>
:<div></div>
}
  </div>
    <div className="container">
      {lineChart}
    </div>
  </>
  )
}