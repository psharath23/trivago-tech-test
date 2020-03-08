
import React from "react";

const NoRecordsFound = (props)=>{
    return <div className="no-records-found">{`no ${props.name ? props.name : 'records'} found`}</div>
}

export default NoRecordsFound