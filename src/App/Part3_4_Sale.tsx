import React, { FC, useRef, useEffect, useState } from 'react';
import { select, Selection } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import { max } from 'd3-array';
import { axisLeft, axisBottom } from 'd3-axis';

const mockData = [{
  name: 'foo',
  number: 9000, 
}, {
  name: 'boo',
  number: 2334,
}, {
  name: 'bar',
  number: 4532,
}, {
  name: 'baz',
  number: 4399,
}, {
  name: 'boz',
  number: 9093,
}, {
  name: 'hoge',
  number: 5000,
}, {
  name: 'piyo',
  number: 8735,
}];

const dimensions = {
  width: 1000,
  height: 500,
  // little bit less than width and height.
  chartWidth: 800,
  chartHeight: 400,
  marginLeft: 200,
}


const Part3_4_Scale: FC = () => {
  const ref = useRef<SVGSVGElement | null>(null);
  const [selection, setSelection] = useState<Selection<SVGSVGElement | null, unknown, null, undefined> | null>(null);

  const maxValue = max(mockData, d => d.number);
  
  // by default domain and range is between 0 and 1.
  // but normally we specify the domain and range.

  // 2) [With svg Group]
  const y = scaleLinear()
    .domain([0, maxValue!])
    .range([0, dimensions.chartHeight]);

  const x = scaleBand()
    .domain(mockData.map(d => d.name))
    .range([0, dimensions.chartWidth])
    .paddingInner(0.05)

  const yAxis = axisLeft(y)
    .ticks(3)
    .tickFormat(d => `${d} unit`)
  const xAxis = axisBottom(x);
  

  // 1) [Without svg Group]
  // const y = scaleLinear()
  //   // [Real Data Range]
  //   // the first arg is the array being floor 
  //   // the second arg is the array being ceiling
  //   // 1000: because our highest data is 9000. the ceiling should cover the highest number.
  //   .domain([0, maxValue!])
  //   // [Changing real data range to fit in the rendering size]
  //   // since we have height of 500 like <svg height={500} /. 
  //   .range([0, 500]);

  // // It divides the range into uniform bands and will map into the domain
  // //
  // const x = scaleBand()
  //   // later when we input at the name and tell us how far along the x axis is it should so.
  //   // real band name
  //   .domain(mockData.map(d => d.name))
  //   // [Change to fit into the rendering area.]
  //   .range([0, 1000])
  //   // 0 is small
  //   // 1 is covering entire band.
  //   // .padding(0.2)
  //   // padding for the space between bands
  //   .paddingInner(0.05)
  //   // the padding for the first and the last one
  //   .paddingOuter(0.3)

  useEffect(() => {
    if (!selection) {
      setSelection(select(ref.current));
    } else {
      // changed value
      // console.log('y(0)', y(0));
      // console.log('y(3234)', y(3234));
      // console.log('y(9000)', y(9000));

      // when we need to see background
      // selection
      //   .append('rect')
      //   .attr('width', dimensions.width)
      //   .attr('height', dimensions.height)
      //   .attr('fill', 'blue')

      const xAxisGroup = selection
        .append('g')
        .attr('transform', `translate(${dimensions.marginLeft}, ${dimensions.chartHeight})`)
        .call(xAxis)

      const yAxisGroup = selection
        .append('g')
        .attr('transform', `translate(${dimensions.marginLeft}, 0)`)
        .call(yAxis)        

      // all group elements
      selection
        .append('g')
        // css control form entire group
        .attr('transform', `translate(${dimensions.marginLeft}, 0)`)
        
        // each individual band.
        .selectAll('rect')
        .data(mockData)
        .enter()
        .append('rect')
        // 2) with ScaleBand
        .attr('width', x.bandwidth())
        .attr('x', d => {
          const xValue = x(d.name);
          if (!xValue) {
            return null;
          }
          return xValue;
        })
        // 1) without scaleBand
        // .attr('x', (_, i) => i*100)
        .attr('fill', 'orange')
        // bar height scaled.
        .attr('height', d => y(d.number))

    }
  }, [selection]);

  return (
    <div>
      {/* group */}
      <svg ref={ref} width={dimensions.width} height={dimensions.height}>
        
      </svg>
      {/* 
        // non group
        <svg ref={ref} width={1000} height={500} />
      */}
    </div>
  )
}

export default Part3_4_Scale;