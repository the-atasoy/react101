import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

interface DeleteConfirmationDialogProps {
  open: boolean;
  title: string;
  contentText: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmationDialog({
  open,
  title,
  contentText,
  onClose,
  onConfirm,
}: DeleteConfirmationDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={onConfirm}
          disableRipple
          sx={{
            backgroundColor: "#AE0611",
            color: "white",
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
