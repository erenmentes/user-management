import { Route,Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import MyTasks from './pages/Tasks/MyTasks'
import CreateTask from './pages/Tasks/CreateTask'
import MyTeams from './pages/Teams/MyTeams'
import TeamTasks from './pages/Teams/TeamTasks'
import CreateTeamTask from './pages/Teams/CreateTeamTask'
import CreateTeam from './pages/Teams/CreateTeam'
import ManageMembers from './pages/Teams/ManageMembers'
import AddMember from './pages/Teams/AddMember'
import ProtectedRoute from './components/ProtectedRoute'
import UpdateTask from './pages/Tasks/UpdateTask'

function App() {
  return (
    <Routes>
      <Route path='/' element={
        <ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>
      }/>
      <Route path='/signup' element={
          <Signup/>
          }/>
      <Route path='/login' element={
          <Login/>
      }/>
      <Route path='/my-tasks' element={
        <ProtectedRoute>
          <MyTasks/>
        </ProtectedRoute>
      }/>
      <Route path='/create-task' element={
        <ProtectedRoute>
          <CreateTask/>
        </ProtectedRoute>
      }/>
      <Route path='/teams' element={
        <ProtectedRoute>
          <MyTeams/>
        </ProtectedRoute>
      }/>
      <Route path='/tasks/team/:team' element={
        <ProtectedRoute>
          <TeamTasks/>
        </ProtectedRoute>
      }/>
      <Route path='/tasks/team/:team/create' element={
        <ProtectedRoute>
          <CreateTeamTask/>
        </ProtectedRoute>
      }/>
      <Route path='/create-team' element={
        <ProtectedRoute>
          <CreateTeam/>
        </ProtectedRoute>
      }/>
      <Route path='/:team/manage-members' element={
        <ProtectedRoute>
          <ManageMembers/>
        </ProtectedRoute>
      }/>
      <Route path='/team/:team/add-members' element={
        <ProtectedRoute>
          <AddMember/>
        </ProtectedRoute>
      }/>
      <Route path='/tasks/update/:id' element={
        <ProtectedRoute>
          <UpdateTask/>
        </ProtectedRoute>
      }/>
    </Routes>
  )
}

export default App
