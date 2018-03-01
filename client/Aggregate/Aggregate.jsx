import React from 'react';


const Aggregate = (props) => {
  console.log('Aggregate', props.orgStats)
  const org = props.orgStats;
  return (
    <div className="aggregate">
      <h2>{org.name}</h2>
      <ul>
        <li>{`# of repos: ${org.num_repos}`}</li>
        <li>{`Total Forks: ${org.totalForks}`}</li>
        <li>{`Total Open Issues: ${org.totalOpenIssues}`}</li>
        <li>{`Total Watchers: ${org.totalWatchers}`}</li>
      </ul>
      <p>Go to <a href={`http://github.com/${org.Name}`}>Github</a></p>
    </div>
  )
}


export default Aggregate;
