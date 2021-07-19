import { useState, useEffect, useRef, FC } from "react";
import { select, Selection } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import { max } from 'd3-array';

const mockData = [{
  name: 'foo',
  units: 32,
}, {
  name: 'bar',
  units: 67,
}, {
  name: 'baz',
  units: 81,
}, {
  name: 'hoge',
  units: 38,
}, {
  name: 'piyo',
  units: 28,
}, {
  name: 'hogera',
  units: 59,
}];

const dimensions = {
  // background area.
  width: 900,
  height: 500,
};

const Part5_transform: FC = () => {
  const ref = useRef<SVGSVGElement | null>(null);
  const [selection, setSelection] = useState<Selection<SVGSVGElement | null, unknown, null, undefined> | null>(null);
  const [ data, setData ] = useState(mockData);

  const y = scaleLinear()
    .domain([0, max(data, d => d.units)!])

    // It goes from scale [0, 400] to [400, 0]
    // .range([0, dimensions.height])
    .range([dimensions.height, 0]);

  const x = scaleBand()
    .domain(data.map(d => d.name))
    .range([0, dimensions.width])
    .padding(0.05)

  useEffect(() => {
    if (!selection) {
      setSelection(select(ref.current));
    } else {
    
      selection
        // all
        .selectAll('rect')
        .data(data)
        // individual
        .enter()
        .append('rect')
        .attr('width', x.bandwidth)
        // It goes from .attr('height', dimensions.height) to .attr('height', d => dimensions.height - y(d.units))  
        // .attr('height', dimensions.height)
        .attr('height', d => dimensions.height - y(d.units))
        .attr('x', d => { 
  
          const nameValue = x(d.name);
  
          if (!nameValue) {
            return null;
          }

          return nameValue
        })
        // added
        .attr('y', d => y(d.units)) // got inverted value since  // It goes from scale [0, 400] to [400, 0] above.
        .attr('fill', 'orange')
    }
  }, [selection]);

  const addRandom = () => {
    
  }

  const removeLAST = () => {

  }

  return (
    <div>
      <svg ref={ref} width={dimensions.width} height={dimensions.height} />
    </div>
  );
}

export default Part5_transform;