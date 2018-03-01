import React, { Component } from "react";
import './Details.css'
import Header from '../header/header.jsx';
import {
  RadialChart,
  Hint,
  Treemap
} from 'react-vis';


class Details extends Component {
  constructor(props) {
    super(props);
    const repoDetails = this.props.details;
    const chartData = [];
    if(repoDetails.languages){
      for ( let language in repoDetails.languages) {
        chartData.push({language: language, angle: repoDetails.languages[language]});
      }
    }
    const treeData = {
      color: "#ffffff",
      children: []
    }


    let mainContributors;
    const NUM_CONTRI_LIMIT = 7;
    if (repoDetails.contributos.length > NUM_CONTRI_LIMIT) {
      repoDetails.contributos.sort( (a,b) => {
        return b.contributions - a.contributions;
      })
      mainContributors = repoDetails.contributos.slice(0, NUM_CONTRI_LIMIT);
    } else {
      mainContributors = repoDetails.contributos;
    }
    console.log('mainContributors', mainContributors);


    for ( let contributor of mainContributors) {
      treeData.children.push({
        title: `   ${contributor.login}: ${contributor.contributions}   `,
        color: '#b3e6ff',
        contributions: contributor.contributions
      })
    }

    this.state = {
      value: false,
      chartData: chartData,
      treeData: treeData
    };
  }

  render() {
    const STYLES = {
      stroke: '#ddd',
      strokeWidth: '0.25',
      strokeOpacity: 0.5,
      fontSize: this.state.treeData.children.length > 5 ? 13 : 17
    }

    const repoDetails = this.props.details;
    return (
      <div>
        <div className='rowDetails'>
          <div className="columnDetails">
            {
            repoDetails.languages &&
            <RadialChart
              className={'donut-chart'}
              innerRadius={250}
              radius={150}
              getAngle={d => d.angle}
              data={this.state.chartData}
              onValueMouseOver={v => this.setState({value: v})}
              showLabels={true}
              onSeriesMouseOut={v => this.setState({value: false})}
              width={550}
              height={550}>
              {this.state.value && <Hint value={this.state.value}/>}
            </RadialChart>
            }
          </div>
          <div className="columnDetails">
            <h2>{repoDetails.orgName}: {repoDetails.name}</h2>
            <h4>{repoDetails.description}</h4>
            <ol>
              <li>Forks: {repoDetails.forks}</li>
              <li>Open Issues: {repoDetails.open_issues}</li>
              <li>Watchers: {repoDetails.watchers}</li>
            </ol>
            <p>Go to <a href={`http://github.com/${repoDetails.orgName}/${repoDetails.name}`}>Github Repo</a></p>
            <br></br>
            <br></br>
            <br></br>
            <h3>Main Contributors</h3>
            <Treemap {...{
              className: 'treemap',
              colorType: 'literal',
              colorRange: ['#88572C'],
              data: this.state.treeData,
              mode: 'circlePack',
              renderMode: 'SVG',
              height: 500,
              width: 500,
              margin: 10,
              getSize: d => d.contributions,
              getColor: d => d.color,
              style: STYLES,
            }}/>
          </div>
        </div>
      </div>
    );
  }
}









export default Details;
