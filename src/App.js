import Header from "./components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Courses from "./pages/Courses/Courses";
import CourseDescription from "./pages/CourseDescriptionPage/CourseDescriptionPage";
import BuyCourse from "./pages/BuyCourse/BuyCourse";
import About from "./pages/About/About";
import Profile from "./pages/Profile/Profile";
import StudentDashboard from "./pages/Dashboard/Dashboard";
import LoginPage from "./pages/Login/Login";
import SignupPage from "./pages/Signup/Signup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, fetchUsers, fetchme } from "./Actions/userActions";
import LoadingPage from "./components/LoadingPage/LoadingPage";
import { clearErrors, clearMessage } from "./Redux/reducers/userSlice";
import PaymentSuccessPage from "./pages/paymentSuccssPage/Success";
import CourseStudyPage from "./pages/CourseStudyPage/CourseStudyPage";
import CourseLecturesPage from "./pages/CourseLecturesPage/CourseLecturesPage";
import DPPage from "./pages/DPPage/DPPage";
import Notes from "./pages/DPPage/Notes";
import DashBoard from "./Admin/dashboard/DashBoard";
import AdminCourses from "./Admin/courses/AdminCourses";
import AddLectures from "./Admin/add lectures/AddLectures";
import Dashboad from "./Admin/Admin Pages/Dashboard/Dashboad";
import AllUsers from "./Admin/Admin Pages/All Users/AllUsers";

function App() {
  const dispatch = useDispatch();

  const { loading, isLoggedIn, user, message, error, users } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchme());
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      {loading ? (
        <LoadingPage />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route
            path="/course/:id"
            element={isLoggedIn ? <CourseDescription /> : <LoginPage />}
          />
          <Route
            path="/course/study/:id"
            element={isLoggedIn ? <CourseStudyPage /> : <LoginPage />}
          />
          <Route
            path="/course/buy/:id"
            element={isLoggedIn ? <BuyCourse /> : <LoginPage />}
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/account"
            element={isLoggedIn ? <Profile user={user} /> : <LoginPage />}
          />
          <Route
            path="/login"
            element={isLoggedIn ? <Home /> : <LoginPage />}
          />
          <Route
            path="/signup"
            element={isLoggedIn ? <Home /> : <SignupPage />}
          />
          <Route
            path="/:id/dashboard"
            element={isLoggedIn ? <StudentDashboard /> : <LoginPage />}
          />
          <Route
            path="/lectures/:id"
            element={isLoggedIn ? <CourseLecturesPage /> : <LoginPage />}
          />
          <Route
            path="/dpp/:id"
            element={isLoggedIn ? <DPPage /> : <LoginPage />}
          />
          <Route
            path="/notes/:id"
            element={isLoggedIn ? <Notes /> : <LoginPage />}
          />
          <Route
            path="/payment-success/:id"
            element={
              isLoggedIn ? <PaymentSuccessPage user={user} /> : <LoginPage />
            }
          />
          <Route
            path="/teacher/dashboard"
            element={
              user && user.role === "teacher" && isLoggedIn ? (
                <DashBoard />
              ) : (
                <Home />
              )
            }
          />
          <Route
            path="/teacher/courses"
            element={
              user && user.role === "teacher" && isLoggedIn ? (
                <AdminCourses />
              ) : (
                <Home />
              )
            }
          />
          <Route
            path="/teacher/add/lectures/:id"
            element={
              user && user.role === "teacher" && isLoggedIn ? (
                <AddLectures />
              ) : (
                <Home />
              )
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              user && user.role === "admin" && isLoggedIn ? (
                <Dashboad />
              ) : (
                <Home />
              )
            }
          />
          <Route
            path="/admin/users"
            element={
              user && user.role === "admin" && isLoggedIn ? (
                <AllUsers users={users} />
              ) : (
                <Home />
              )
            }
          />
        </Routes>
      )}
      <Footer />

      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
