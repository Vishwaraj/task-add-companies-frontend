
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Search from './components/SearchPage/Search';
import ListPage from './components/ListPage/ListPage';

function App() {
  return (
  <>
    <Routes>
      <Route path='/' element={<Search/>} />
      <Route path='/companies' element={<ListPage/>} />
    </Routes>
  </>
  );
}

export default App;
