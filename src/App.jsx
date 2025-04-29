import { Route, Routes } from "react-router-dom";
import ProtectedLayout from "./layouts/ProtectedLayout";
import CategoryViewPage from "./pages/CategoryViewPage";
import DashboardPage from "./pages/DashboardPage";
import DocumentListPage from "./pages/DocumentListPage";
import DocumentViewPage from "./pages/DocumentViewPage";
import LoginPage from "./pages/LoginPage";
import MyTeamPage from "./pages/MyTeamPage";
import NotFoundPage from "./pages/NotFoundPage";
import TaskView from "./pages/TaskView";
import TimeSheetPage from "./pages/TimeSheetPage";
import TaskPage from "./pages/TaskPage";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<ProtectedLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="my-team" element={<MyTeamPage />} />
        <Route path="category-view" element={<CategoryViewPage />} />
        <Route path="document-list" element={<DocumentListPage />} />
        <Route path="document-view" element={<DocumentViewPage />} />
        <Route path="task-view" element={<TaskView />} />
        <Route path="time-sheet" element={<TimeSheetPage />} />
        <Route path="task" element={<TaskPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;