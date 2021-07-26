import { FC } from 'react';
import Part1Basic from './Part1_basic';
import Part2Join from './Part2_Join';
import Part3And4Scale from './Part3_4_Scale';
import Part5Transform from './Part5_transform';
import Part6Transition from './Part6_Transition';

const App: FC = () => {
  return <div>
      <Part1Basic />
      <Part2Join />
      <Part3And4Scale />
      <Part5Transform />
      <Part6Transition />
  </div>
}

export default App;