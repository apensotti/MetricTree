import React from 'react'
import Flow from '../components/trees/Flow'

import { getPreviousTwoWeeksData } from '@/data/MetricTreeData'
import SparkChart from '@/components/component/SparkChart'

const page = () => {

  const date = new Date();
  const previousTwoWeeksData = getPreviousTwoWeeksData(date);
  return (
  <>    
    <div style={{ height: "100vh", width: "100vw"}}>
        <Flow/>
    </div>
  </>
  )
}



export default page