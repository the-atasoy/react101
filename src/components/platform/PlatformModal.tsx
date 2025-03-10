import { useState, FormEvent, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { Platform } from "../../types/Platform";

interface PlatformModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (platform: Omit<Platform, "id">) => Promise<void>;
  platform?: Platform;
  mode: "create" | "update";
}

export default function PlatformModal({
  isOpen,
  onClose,
  onSubmit,
  platform,
  mode,
}: PlatformModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    publisher: "",
    cost: "",
  });

  useEffect(() => {
    if (platform && mode === "update") {
      setFormData({
        name: platform.name,
        publisher: platform.publisher,
        cost: platform.cost,
      });
    } else {
      setFormData({
        name: "",
        publisher: "",
        cost: "",
      });
    }
  }, [platform, isOpen, mode]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData({ name: "", publisher: "", cost: "" });
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {mode === "create" ? "Add New Platform" : "Update Platform"}
        </DialogTitle>
        <DialogContent>
          <TextField
            name="name"
            label="Name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            name="publisher"
            label="Publisher"
            fullWidth
            margin="normal"
            value={formData.publisher}
            onChange={(e) =>
              setFormData({ ...formData, publisher: e.target.value })
            }
          />
          <TextField
            name="cost"
            label="Cost"
            fullWidth
            margin="normal"
            value={formData.cost}
            onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
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
