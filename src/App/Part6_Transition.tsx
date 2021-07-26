import { useState, useEffect, useRef, FC } from "react";
import { select, Selection } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import { max } from 'd3-array';
import Randomstring from "randomstring";
import 'd3-transition';
import { easeElastic, easeQuadInOut, easeBounce, easeLinear } from 'd3-ease';

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
        .attr('height', 0) // 0 height in Point A
        .attr('fill', 'orange')
        .attr('x', d => x(d.name)!) /// Point A


        // .attr('height', 0) 
        .attr('y', dimensions.height) // set height
        .transition()
        .duration(500) /// Transition
        .delay((_, t) => t * 100) // 100 delay after the other for the bar.
        .ease(easeElastic)


        // Finally set bar
        .attr('height', d => dimensions.height - y(d.units))
        .attr('y', d => y(d.units)) /// Point B


        // [Origin]
        // selection
        //   // all
        //   .selectAll('rect')
        //   .data(data)
        //   // individual
        //   .enter()
        //   .append('rect')
        //   .attr('width', x.bandwidth)
        //   // It goes from .attr('height', dimensions.height) to .attr('height', d => dimensions.height - y(d.units))  
        //   // .attr('height', dimensions.height)
        //   .attr('height', d => dimensions.height - y(d.units))
        //   .attr('x', d => { 
    
        //     const nameValue = x(d.name);
    
        //     if (!nameValue) {
        //       return null;
        //     }

        //     return nameValue
        //   })
        //   // added
        //   .attr('y', d => y(d.units)) // got inverted value since  // It goes from scale [0, 400] to [400, 0] above.
        //   .attr('fill', 'orange')
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
          .exit()
          .remove()
        
        // In the updating case, we do not need to worry about Point A.

        rects
          .transition()
          .duration(300)
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

        // [Transition]
        rects
          .enter()
          .append('rect')
          .attr('x', d => x(d.name)!)
          .attr('width', x.bandwidth)
          .attr('height', 0)
          .attr('y', dimensions.height)
          .transition()
          .delay(400)
          .duration(500)
          .ease(easeElastic)
          .attr('height', d => dimensions.height - y(d.units))
          .attr('y', d => y(d.units))
          .attr('fill', 'orange')
        
        
        // [Origin]
        // rects
          // .enter()
          // .append('rect')
          // .attr('width', x.bandwidth)
          // .attr('height', d => dimensions.height - y(d.units))
          // .attr('x', d => { 
    
          //   const nameValue = x(d.name);
    
          //   if (!nameValue) {
          //     return null;
          //   }

          //   return nameValue
          // })
          // .attr('y', d => y(d.units)) 
          // .attr('fill', 'orange')
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

// -----------------------------------------------------------------
// [Basic Transition]
// const Button = styled.button`
//   background-color: blue;
//   transition-duration: 500ms;
//   transition-timing-function: ease-in-out;

//   &:hover {
//     background-color: 'orange'
//   }
// `;

// const TransitionEx: FC = () => {
//   const ref =  useRef<SVGSVGElement | null>(null);
//   const [ selection, setSelection ] = useState<null | Selection<
//     SVGSVGElement | null,
//     unknown,
//     null,
//     undefined
//   >>(null);

//   useEffect(() => {
//     if (!selection) {
//       setSelection(select(ref.current));
//     } else {
//       selection
//         .append('rect')
//         .attr('width', 100)
//         .attr('height', 100)
//         .attr('fill', 'orange') /// 1) Point A

//         // from this line for transition.
//         .transition()
//         .duration(2000) // 2sec
//         .ease(easeBounce) // bouncing at the last minutes.
//         .attr('fill', 'blue') /// 3) Transition

//         .attr('height', 400) /// 2) Point B

//     }
//   }, [selection]);

//   return (
//     <div>
//       <svg ref={ref} height={400} />
//     </div>
//   );
// }

// export default TransitionEx;
