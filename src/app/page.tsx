import React from 'react'
import Flow from '../components/trees/Flow'

import SparkChart from '@/components/component/SparkChart'

const page = () => {
  const date = new Date();
  return (
  <>    
    <div style={{ height: "100vh", width: "100vw"}}>
        <Flow/>
    </div>
  </>
  )
}



export default page