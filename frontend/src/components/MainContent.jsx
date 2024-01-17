import SearchBar from './Searchbar';
import TwoDiv from './TwoDiv';
import ThreeDiv from './ThreeDiv'
import React from 'react';

const MainContent = () => {
  const [allData, setAllData] = React.useState({
    data: [1, 2, 3, 4, 5],
    likelihoodCounts: [
      {_id:0, count: 0 }
    ],
    intensityCounts: [
      { count: 0 , range:''}
    ],
    relevanceCounts: [
      { rel:0,count: 0 }
    ],
    sectorCounts: [
      { count: 0 }
    ],
    countryCounts: [
      { country:0,count: 0 }
    ],
    topicCounts: [
      { topic:0,count: 0 }
    ],
    startYearCounts: [
      { _id:0,count: 0 }
    ],
  })

  console.log(allData)

  React.useEffect(() => {
    const apicall = async () => {
      try {
        const response = await fetch('http://localhost:8080/')
        const data = await response.json()
        setAllData(data)
      }
      catch (error) {
        console.log(error)
      }
    }
    apicall()
  }, [])


  return (
    <div id='main-content'>
      <SearchBar />
      <TwoDiv apiData={allData} />
      <ThreeDiv apiData={allData} />
    </div>
  )
}

export default MainContent;