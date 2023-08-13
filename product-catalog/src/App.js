import AdminHome from './components/AdminHome';
import {Routes,Route} from 'react-router-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import AddCategory from './components/AddCatagory';
import ViewAllCatagories from './components/ViewAllCatagories';
import ViewCategoryItems from './components/ViewCategoryItems';
import DeleteCatagory from './components/DeleteCatagory';

function App() {

  return(
    <div>
      <Router>
        <Routes>
        <Route path="/admin" Component={AdminHome}></Route>
        <Route path="/addCatagory" Component ={AddCategory}></Route>
        <Route path="/viewAllCatagories" Component={ViewAllCatagories}></Route>
        <Route path="/viewCategoryItems" Componenent={ViewCategoryItems}></Route>
        <Route path="/deleteCategory" Component = {DeleteCatagory}></Route>
        </Routes>
        </Router>
    </div>
  )
}

export default App;
