import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Todo } from './pages/Todo';


export function Router() {
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/todos/:project_id" element={<Todo />} />
        </Routes>
    )
}