import { useState, useEffect, useRef, FC } from "react";
import { select, Selection } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import { max } from 'd3-array';
import Randomstring from "randomstring";

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

  let y = scaleLinear()
    .domain([0, max(data, d => d.units)!])
    
    /**
      Not this one but example.
      # real value range ------------------ scale down (give width and height)
      [domain] [0, 4000]  ----------------> [400, 0]; 
      
      Lets say 3000 domain value.    
      In the range between 0 and 400, the domain value will be 300.
      But since it is inverted it is not 300 and it is 100.


      Then we have the attribute below.
       .attr('height', d => dimensions.height - y(d.units))
       which means ===> ('height', d => 400 - 100) ===> 300 which is length from 100.

       Please find the example in data transform.png.
     */
    
    
    // .range([0, dimensions.height])
    .range([dimensions.height, 0]);

  let x = scaleBand()
    .domain(data.map(d => d.name))
    .range([0, dimensions.width])
    .padding(0.05);

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

  useEffect(() => {
    if (selection) {
      y = scaleLinear()
        .domain([0, max(data, d => d.units)!])
        .range([dimensions.height, 0]);
    
      x = scaleBand()
        .domain(data.map(d => d.name))
        .range([0, dimensions.width])
        .padding(0.05);  

        const rects = selection.selectAll('rect').data(data)
          
        rects
          // like enter selection, we have exit selection.
          .exit()
          // remove the existing chart?
          .remove()
        
        rects
          .attr('width', x.bandwidth)
          .attr('height', d => dimensions.height - y(d.units))
          .attr('x', d => { 
    
            const nameValue = x(d.name);
    
            if (!nameValue) {
              return null;
            }
  
            return nameValue
          })
          .attr('y', d => y(d.units))
          .attr('fill', 'orange')

        rects
          .enter()
          .append('rect')
          .attr('width', x.bandwidth)
          .attr('height', d => dimensions.height - y(d.units))
          .attr('x', d => { 
    
            const nameValue = x(d.name);
    
            if (!nameValue) {
              return null;
            }

            return nameValue
          })
          .attr('y', d => y(d.units)) 
          .attr('fill', 'orange')
      }


  }, [data]);

  const addRandom = () => {
    const dataToBeAdded = {
      name: Randomstring.generate(10),
      units: Math.floor(Math.random() * (80) + 20),
    }

    setData([ ...data, dataToBeAdded ]);

  }

  const removeLAST = () => {
    if (data.length === 0) {
      return;
    }
    const sliceData = data.slice(0, data.length-1);
    setData(sliceData);

  }

  return (
    <div>
      <svg ref={ref} width={dimensions.width} height={dimensions.height} />
      <button onClick={addRandom}>Add Random</button>
      <button onClick={removeLAST}>Remove Last</button>
    </div>
  );
}

export default Part5_transform;