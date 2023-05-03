import { Routes, Route } from 'react-router-dom';
import { ProtectedLayout } from './components/ProtectedLayout';
import { Projects } from './pages/Projects';
import { Login } from './pages/Login';
import { Todo } from './pages/Todo';
import { Home } from './pages/Home';
import { CreateAccount } from './pages/CreateAccount';


export function Router() {
    return(
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/create-account' element={<CreateAccount />} />
            <Route path='/dashboard' element={<ProtectedLayout><Home /></ProtectedLayout> } />
            <Route path="/projects" element={<ProtectedLayout><Projects /></ProtectedLayout>} />
            <Route path="/todos/:project_id" element={<ProtectedLayout><Todo /></ProtectedLayout>} />
        </Routes>
    )
}