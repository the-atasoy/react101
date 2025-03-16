import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  contentText: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmationDialog({
  isOpen: open,
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
      <DialogActions sx={{ padding: "0 24px 20px 24px" }}>
        <Button variant="contained" color="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="error"
          onClick={onConfirm}
          disableRipple
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
