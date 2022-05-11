import { Route } from 'react-router-dom';

import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Route path='/' exact component={Home} />
      <Route path='/checkout' component={Checkout} />
      <Route path='/success' component={Success} />
    </>
  );
}

export default App;
