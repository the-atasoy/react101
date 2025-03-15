import { useState, FormEvent, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { Command } from "../../types/Command";

interface CommandModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (command: Omit<Command, "id">) => Promise<void>;
  command?: Command;
  platformId: string;
  mode: "create" | "update";
}

export default function CommandModal({
  isOpen,
  onClose,
  onSubmit,
  command,
  platformId,
  mode,
}: CommandModalProps) {
  const [formData, setFormData] = useState({
    platformId: platformId,
    howTo: "",
    commandLine: "",
  });

  useEffect(() => {
    if (command && mode === "update") {
      setFormData({
        platformId: command.platformId,
        howTo: command.howTo,
        commandLine: command.commandLine,
      });
    } else {
      setFormData({
        platformId: platformId,
        howTo: "",
        commandLine: "",
      });
    }
  }, [command, isOpen, mode]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData({ platformId: platformId, howTo: "", commandLine: "" });
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {mode === "create" ? "Add New Command" : "Update Command"}
        </DialogTitle>
        <DialogContent>
          <TextField
            name="howTo"
            label="How To"
            fullWidth
            margin="normal"
            value={formData.howTo}
            onChange={(e) =>
              setFormData({ ...formData, howTo: e.target.value })
            }
          />
          <TextField
            name="commandLine"
            label="Command Line"
            fullWidth
            margin="normal"
            value={formData.commandLine}
            onChange={(e) =>
              setFormData({ ...formData, commandLine: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {mode === "create" ? "Add" : "Edit"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
