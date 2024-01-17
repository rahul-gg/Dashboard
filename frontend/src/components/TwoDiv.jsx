import ReactApexChart from 'react-apexcharts';
import React from 'react'
const TwoDiv = (props) => {
      
const [choice,setChoice]=React.useState('topic')

const handleClick=()=>{
  if(choice==='topic'){
setChoice('sector')
  }
  else{
    setChoice('topic')
  }
}

    const sectorChartData = {
        options : {
            chart: {
              type: 'area', 
              zoom: {
                enabled: false
              }
            },
            dataLabels:{
              enabled:false
            },
              stroke: {
                curve: 'smooth'
              },
            grid: {
                show: false, 
              },
            xaxis: {
                
                 categories: props.apiData.sectorCounts.map((item)=>item.sector),
              },
              yaxis: {
                title: {
                  text: 'Values', 
                },
              },
            },
        series: [
            {  name:"value",
                //  data: [11,22,33,44,55],
                 data:props.apiData.sectorCounts.map((item)=>item.count),
                 color:"#4a5bc7"
            }
        ],
       
    }
   const donutChartData={
        options: {
            chart: {
              type: 'donut', 
            },
            dataLabels:{
              enabled:false
            },
            theme: {
                monochrome: {
                  enabled: true,
                  color:'#7662a8'
                }
              },

            labels:props.apiData.intensityCounts.map((item)=>item.range),
          },
          series: props.apiData.intensityCounts.map((item)=>item.count)
        }

      const topicChartData={
        options : {
            chart: {
              type: 'area', 
              zoom: {
                enabled: false
              }
            },
            dataLabels:{
              enabled:false
            },
              stroke: {
                curve: 'smooth'
              },
            grid: {
                show: false, 
              },
            xaxis: {
                
                 categories: props.apiData.topicCounts.map((item)=>item.topic),

              },
              yaxis: {
                title: {
                  text: 'Values', 
                },
              },
            },
        series: [
            {  name:"value",
                //  data: [11,22,33,44,55],
                 data:props.apiData.topicCounts.map((item)=>item.count),
                 color:"#4a5bc7"
            }
        ],
       
    }

    return (
        <div id="two-div">
            <div className="first data-div">
              { choice==='sector'?
        <p className='chart-heading'>Number of insights according to Energy Topics</p>
        :
        <p className='chart-heading'>Number of insights according to Non-Energy Sectors</p>
              }
      <div className="filter-btn" onClick={handleClick}>Filter by {choice}</div>
       <ReactApexChart
       options={ choice==='topic'? sectorChartData.options: topicChartData.options} 
       series={ choice==='topic'? sectorChartData.series:topicChartData.series}   
       type="area"                
       height={360}            
     />
    
      
            </div>
            <div className="second data-div">
            <p className='chart-heading'>Variation of insights by their intensity</p>
            <div className='donut-div'>
            <ReactApexChart
        options={donutChartData.options}
        series={donutChartData.series}  
        type="donut"                
        height={400}    
        width={400}
      />
      </div>
      <div className="filter-btn">View More</div>
            </div>
        </div>
    )
    }

export default TwoDiv;