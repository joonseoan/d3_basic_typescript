import { FC } from 'react';
import Part1Basic from './Part1_basic';
import Part2Join from './Part2_Join';
import Part3And4Scale from './Part3_4_Sale';
import Part5Transform from './Part5_transform';

const App: FC = () => {
  return <div>
      <Part1Basic />
      <Part2Join />
      <Part3And4Scale />
      <Part5Transform />
  </div>
}

export default App;