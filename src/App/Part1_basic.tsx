import { useRef, FC, useEffect } from 'react';
import { select, selectAll } from 'd3-selection';

const Part1_Basic: FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {

    /*
      groups: Array(1)
        0: svg
        length: 1
      _parents: Array(1)
        0: null
        length: 1
    */

    /**
      Default svg: 300 x 150
     */
    console.log(select(svgRef.current));
    
    // [Single Select for svg]
    // default target is <svg> container
    // It is additional bar, which is not in DOM.
    // select(svgRef.current)
    //   // when we put append('rect'), the target element is <rect>
    //   .append('rect') // rectangle.
    //   // the first argument : name of attribute
    //   // the second argument: value of attribute.
    //   .attr('width', 100)
    //   .attr('height', 100)
    //   .attr('fill', 'purple')
    //   .attr('x', (_, t) => t * 100)
    
    // [Multiple Select]
    // like css
    // we use id, and class name
    // selectAll('#id') or selectAll('.className')
    // it will stack over each other.
    selectAll('rect')
      // individual bard width size
      .attr('width', 100)
      .attr('height', 100)
      .attr('fill', 'blue')
    
    // The container size of the individual bar.
    // if the container width size > width of the bar width ==> will show white space.
    // if the container width size < width of the bar width ===> the bar will be overlapped each other. 
    .attr('x', (_, t) => t * 80)
  }, [])

  return (
    <div>
      <svg ref={svgRef}>
        <rect />
        <rect />
        <rect />
      </svg>
    </div>
  )
}

export default Part1_Basic;