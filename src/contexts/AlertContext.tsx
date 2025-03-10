import { createContext, useState, useContext, ReactNode } from "react";
import { Alert as MuiAlert, Snackbar } from "@mui/material";

type AlertSeverity = "success" | "info" | "warning" | "error";

interface AlertContextType {
  success: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
  warning: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
}

export const AlertContext = createContext<AlertContextType | undefined>(
  undefined
);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [severity, setSeverity] = useState<AlertSeverity>("info");
  const duration = 3000;

  const showAlert = (
    newSeverity: AlertSeverity,
    newMessage: string,
    newTitle?: string
  ) => {
    setOpen(false);
    setTimeout(() => {
      setSeverity(newSeverity);
      setMessage(newMessage);
      setTitle(newTitle);
      setOpen(true);
    }, 100);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const contextValue: AlertContextType = {
    success: (message, title?) => showAlert("success", message, title),
    info: (message, title?) => showAlert("info", message, title),
    warning: (message, title?) => showAlert("warning", message, title),
    error: (message, title?) => showAlert("error", message, title),
  };

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={duration}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          onClose={handleClose}
          severity={severity}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {title && <strong>{title}: </strong>}
          {message}
        </MuiAlert>
      </Snackbar>
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (context === undefined)
    throw new Error("useAlert must be used within an AlertProvider");
  return context;
}

export const AlertManager = {
  success: (message: string, title?: string) => {
    if (window.alertDispatch)
      window.alertDispatch("success", message, title ?? "Success");
  },
  info: (message: string, title?: string) => {
    if (window.alertDispatch)
      window.alertDispatch("info", message, title ?? "Info");
  },
  warning: (message: string, title?: string) => {
    if (window.alertDispatch)
      window.alertDispatch("warning", message, title ?? "Warning");
  },
  error: (message: string, title?: string) => {
    if (window.alertDispatch)
      window.alertDispatch("error", message, title ?? "Error");
  },
};

declare global {
  interface Window {
    alertDispatch?: (
      severity: AlertSeverity,
      message: string,
      title?: string
    ) => void;
  }
}
