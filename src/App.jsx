import { Route, Routes } from "react-router-dom";
import ProtectedLayout from "./layouts/ProtectedLayout";
import CategoryViewPage from "./pages/CategoryViewPage";
import DashboardPage from "./pages/DashboardPage";
import DocumentListPage from "./pages/DocumentListPage";
import DocumentViewPage from "./pages/DocumentViewPage";
import Login from "./pages/Login";
import MyTeamPage from "./pages/MyTeamPage";
import NotFound from "./pages/NotFound";
import TaskView from "./pages/TaskView";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="my-team" element={<MyTeamPage />} />
        <Route path="category-view" element={<CategoryViewPage />} />
        <Route path="document-list" element={<DocumentListPage />} />
        <Route path="document-view" element={<DocumentViewPage />} />
        <Route path="task-view" element={<TaskView />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
