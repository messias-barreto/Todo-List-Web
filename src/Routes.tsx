import { Routes, Route } from 'react-router-dom';
import { ProtectedLayout } from './components/ProtectedLayout';
import { Projects } from './pages/Projects';
import { Login } from './pages/Login';
import { Todo } from './pages/Todo';
import { Home } from './pages/Home';


export function Router() {
    return(
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/dashboard' element={<Home />} />
            <Route path="/projects" element={<ProtectedLayout><Projects /></ProtectedLayout>} />
            <Route path="/todos/:project_id" element={<ProtectedLayout><Todo /></ProtectedLayout>} />
        </Routes>
    )
}