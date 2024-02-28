import {
  EuiProvider,
  EuiThemeProvider,
  EuiThemeColorMode,
  EuiGlobalToastList,
} from "@elastic/eui";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import { useDispatch } from "react-redux";
import { useAppSelector } from "./app/hooks";
import ThemeSelector from "./components/ThemeSelector";
import CreateMeeting from "./Pages/CreateMeeting";
import OneOnOneMeeting from "./Pages/OneOnOneMeeting";
import { setToasts } from "./app/slices/meeting/meetingsSlice";
import VideoConference from "./Pages/VideoConference";
import MyMeetings from "./Pages/MyMeetings";
import Meetings from "./Pages/Meetings";
import JoinMeeting from "./Pages/JoinMeeting";

function App() {
  const dispatch = useDispatch();
  const isDarkTheme = useAppSelector((zoom) => zoom.auth.isDarkTheme);
  const [theme, setTheme] = useState<EuiThemeColorMode>("light");
  const [initTheme, setInitTheme] = useState(true);
  const toast = useAppSelector((zoom) => zoom.meetings.toasts);

  useEffect(() => {
    const currTheme = localStorage.getItem("zoom-theme");
    if (currTheme) {
      setTheme(currTheme as EuiThemeColorMode);
    } else {
      localStorage.setItem("zoom-them", "light");
    }
  }, []);

  useEffect(() => {
    if (initTheme) setInitTheme(false);
    else {
      window.location.reload();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkTheme]);

  const overRides = {
    colors: {
      LIGHT: { primary: "#0b5cff" },
      DARK: { primary: "#0b5cff" },
    },
  };

  const removeToast = (removeToast: { id: string }) => {
    dispatch(
      setToasts(
        toast.filter((toast: { id: string }) => toast.id !== removeToast.id)
      )
    );
  };

  return (
    <ThemeSelector>
      <EuiProvider colorMode={theme}>
        <EuiThemeProvider modify={overRides}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<CreateMeeting />} />
            <Route path="/create1on1" element={<OneOnOneMeeting />} />
            <Route path="/videoconference" element={<VideoConference />} />
            <Route path="/mymeetings" element={<MyMeetings />} />
            <Route path="/meetings" element={<Meetings />} />
            <Route path="/join/:id" element={<JoinMeeting />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<Dashboard />} />
          </Routes>
          <EuiGlobalToastList toasts={toast} dismissToast={removeToast} toastLifeTimeMs={5000} />
        </EuiThemeProvider>
      </EuiProvider>
    </ThemeSelector>
  );
}

export default App;
