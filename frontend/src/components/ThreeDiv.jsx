import React from "react"
import ReactApexChart from 'react-apexcharts';



const ThreeDiv=(props)=>{


    const areaChartData={
        options: {
            chart: {
                type: 'area',
                zoom: {
                  enabled: false
                }
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: 'straight'
              },
            xaxis: {
              categories: props.apiData.relevanceCounts.map((item)=>item.rel), 
              title:{
                text:"Relevance Index"
              }
            },
            grid: {
                show: false, 
              },
              toolbar: {
                show: false, 
              },
          },
          series: [
            {
              name: 'Series 1', 
              data: props.apiData.relevanceCounts.map((item)=>item.count) ,
              color:'#8c94cb'
            },
          ],
        }

        const likelihoodData={
            options : {
                chart: {
                  type: 'bar', 
                },
                dataLabels:{
                    enabled:false
                  },
                plotOptions: {
                    bar: {
                      columnWidth: '40%', 
                    },
                  },
               
                grid: {
                    show: false, 
                  },
                xaxis: {
                    
                     categories:props.apiData.likelihoodCounts.map((item)=> item._id) ,
                    title:{
                        text:"Likelihood Index"
                      }
                  },
                  yaxis: {
                    title: {
                      text: 'values', 
                    },
                  },
                },
            series: [
                {  name:"value",
                     data:props.apiData.likelihoodCounts.map((item)=> item.count),
                     color:"#4a5bc7"
                }
            ],
        }

        const pieChartData={
          options: {
              chart: {
                type: 'pie', 
              },
              dataLabels:{
                enabled:true
              },
              theme: {
                  monochrome: {
                    enabled: true,
                    color:'#8166c3'
                  }
                },
  
              labels:props.apiData.startYearCounts.map((item)=>item._id),
            },
            series: props.apiData.startYearCounts.map((item)=> item.count)
          }

    return(
        <div id="three-div">
            <div className="box">
            <p className='chart-heading'>Trends of Insights by Relevances</p>
            <ReactApexChart
        options={areaChartData.options}
        series={areaChartData.series}  
        type="area"                
        height={420}    
        width={350}
      />
            </div>
            <div className="box">
            <p className='chart-heading'>Trends of Insights by Likelihood</p>
            <ReactApexChart
        options={likelihoodData.options} 
        series={likelihoodData.series}   
        type="bar"                
        height={420}              
      />
            </div>
            <div className="box">  
            <p className='chart-heading'>Representation of Insights by Start Year</p>
            <div className="donut-div">
            <ReactApexChart
        options={pieChartData.options}
        series={pieChartData.series}  
        type="pie"                
        height={350}    
        width={350}
      />
      </div>
      <div className="filter-btn">View More</div>
            </div>
        </div>
        
    )
}

export default ThreeDiv