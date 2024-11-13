import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";
import './App.css';
import Home from './Home';
import CitizensView from './component/citizen/CitizensView';
import NavBar from "./component/common/navBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddCitizen from "./component/citizen/AddCitizen";
import EditCitizen from "./component/citizen/EditCitizen";
import CitizenDetails from "./component/citizen/CitizenDetails";
import CategoryView from "./component/category/CategoryView";
import AddCategory from "./component/category/AddCategory";
import EditCategory from "./component/category/EditCategory";
import AssignedView from "./component/categoryassignment/AssignedView";
import AssignCategory from "./component/categoryassignment/AssignCategory";
import EditAssigned from "./component/categoryassignment/EditAssigned";
import AssignedFullInfo from "./component/categoryassignment/AssignedFullInfo";
import StatisticsView from "./component/categorystatistics/StatisticsView";
import AddStatistics from "./component/categorystatistics/AddStatistics";
import EditStatistics from "./component/categorystatistics/EditStatistics";
import AuditLogView from "./component/auditlog/AuditLogView";
import LoginForm from './component/auth/LoginForm';

function App() {
  return (
    <main className="App">

      <Router>
      <NavBar/>
        <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route exact path="/view-citizens" element={<CitizensView/>}></Route>
          <Route exact path="/add-citizens" element={<AddCitizen/>}></Route>
          <Route exact path="/edit-citizen/:id" element={<EditCitizen/>}></Route>
          <Route exact path="/citizen-details/:id" element={<CitizenDetails/>}></Route>
          <Route exact path="/view-category" element={<CategoryView/>}></Route>
          <Route exact path="/add-categories" element={<AddCategory/>}></Route>
          <Route exact path="/edit-category/:id" element={<EditCategory/>}></Route>
          <Route exact path="/view-categoryassignment" element={<AssignedView/>}></Route>
          <Route exact path="/assign-category" element={<AssignCategory/>}></Route>
          <Route exact path="/edit-categoryassignment/:id" element={<EditAssigned/>}></Route>
          <Route exact path="/assignedfullinformation/:id" element={<AssignedFullInfo/>}></Route>
          <Route exact path="/view-categorystatistic" element={<StatisticsView/>}></Route>
          <Route exact path="/add-categorystatistics" element={<AddStatistics/>}></Route>
          <Route exact path="/edit-categorystatistic/:id" element={<EditStatistics/>}></Route>
          <Route exact path="/view-auditlog" element={<AuditLogView/>}></Route>
          <Route exact path="/login" element={<LoginForm />} />

        </Routes>
      </Router>

    </main>
  );
}

export default App;
