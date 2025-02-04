import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./components/AdminDashboard";
import FacultyDashboard from "./components/FacultyDashboard";
import StudentDashboard from "./components/StudentDashboard";
import ManageBuses from "./components/ManageBuses";
import ProtectedRoute from "./components/ProtectedRoute";
import FacultyAllocationPage from "./components/FacultyAllocationPage";



const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          {/* Add nested admin routes here */}
          {/* <Route path="manage-buses" element={<ManageBuses />} />
          <Route path="allocate-faculty" element={<FacultyAllocationPage />} /> */}
        </Route>

        {/* Faculty Routes */}
        <Route
          path="/faculty/*"
          element={
            <ProtectedRoute allowedRoles={["FACULTY"]}>
              <FacultyDashboard />
            </ProtectedRoute>
          }
        >
          {/* Add nested faculty routes here */}
        </Route>

        {/* Student Routes */}
        <Route
          path="/student/*"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        >
          {/* Nested student routes */}
         
          {/* <Route path="view-profile" element={<ViewProfile />} />
          <Route path="view-attendance" element={<ViewAttendance />} /> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
