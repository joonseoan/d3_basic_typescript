import { FC, useRef, useEffect, useState } from 'react';
import { select, Selection } from 'd3-selection';

// 4)
const mockData = [{
  units: 150,
  color: 'purple',
}, {
  units: 100,
  color: 'orange',
}, {
  units: 50,
  color: 'blue',
}, {
  units: 70,
  color: 'grey'
}, {
  units: 120,
  color: 'red'
}];

// 3)
// const mockData = [{
//   units: 150,
//   color: 'purple',
// }, {
//   units: 100,
//   color: 'orange',
// }, {
//   units: 50,
//   color: 'blue',
// }]

// 2)
// const mockData = [{
//   width: 200,
//   height: 150,
//   color: 'orange',
// }]

const Part2_Join: FC = () => {
  const [ selection, setSelection ] = useState<
    Selection<SVGSVGElement | null, unknown, null, undefined> | 
    null>(null);
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!selection) {
      setSelection(select(ref.current));
    } else {
      // 4)
      // if we have data more than DOM rendered <rect/>

      // select().selectAll are possible to switch select ---> selectAll.
      //  Also please remind select vs selectAll in part 1.
      const rects = selection
        .selectAll('rect')
        .data(mockData)
        .attr('width', 100)
        .attr('height', d => d.units)
        .attr('fill', d => d.color)
        .attr('x',  (_, i) => i * 100)

        // console.log('rects: ', rects) // got "Enter" attribute when data is greater than DOM element.
        // Additional rectangle
        rects
          .enter()
          .append('rect')
          .attr('width', 100)
          .attr('height', d => d.units)
          .attr('fill', d => d.color)
          .attr('x',  (_, i) => i * 100)



        // 3) multiple bars WHICH are rendered in DOM
        // selection
          // .selectAll('rect')
          // .data(mockData)
          // .attr('width', 100)
          // .attr('height', d => d.units)
          // .attr('fill', d => d.color)
          // .attr('x',  (_, i) => i * 100)

        // Important it is additional "rect" before "rect" which is in DOM
        // 2) by using array.
          // selection
          //   .data([{
          //     width: 200,
          //     height: 150,
          //     color: 'orange',
          //   }])
          //   .append('rect')
          //   // from mock.data
          //   .attr('width', d => d.width)
          //   .attr('height', d => d.height)
          //   .attr('fill', d => d.color)

        // console.log('selection: ', selection)

        // Important it is additional "rect" before "rect" which is in DOM
        // 1) individual setup
        // selection
        // .append('rect')
        // .attr('height', 100)
        // .attr('width', 200)
        // .attr('fill', 'purple')
    }  
  }, [selection]);

  // console.log('selection', selection);

  return (
    <div>
      {/* 3) / 4) */}
      <svg ref={ ref} width={500}>
        <rect />
        <rect />
        <rect />
      </svg>

      {/*
        // 1) and 2) 
        <svg ref = {ref} /> 
      */}
    </div>
  )
}

export default Part2_Join;