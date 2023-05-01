import { Routes, Route } from 'react-router-dom';
import { ProtectedLayout } from './components/ProtectedLayout';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Todo } from './pages/Todo';


export function Router() {
    return(
        <Routes>
            <Route path='/login' element={<Login />} />
            <Route path="/" element={<ProtectedLayout><Home /></ProtectedLayout>} />
            <Route path="/todos/:project_id" element={<ProtectedLayout><Todo /></ProtectedLayout>} />
        </Routes>
    )
}