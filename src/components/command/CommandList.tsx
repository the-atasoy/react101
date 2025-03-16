import { useState, useEffect } from "react";
import {
  Alert,
  CircularProgress,
  Typography,
  Box,
  Button,
  Container,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddIcon from "@mui/icons-material/Add";
import { Command } from "../../types/Command";
import { ApiError } from "../../types/error";
import CommandCard from "./CommandCard";
import commandService from "../../services/commandService";
import CommandModal from "./CommandModal";
import { AlertManager } from "../../contexts/AlertContext";
import DeleteConfirmationDialog from "../common/DeleteConfirmationDialog";

interface CommandListProps {
  platformId: string;
  platformName: string;
}

export default function CommandList({
  platformId,
  platformName,
}: CommandListProps) {
  const [commands, setCommands] = useState<Command[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "update">("create");
  const [selectedCommand, setSelectedCommand] = useState<Command | undefined>(
    undefined
  );
  const [commandToDelete, setCommandToDelete] = useState<string | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const createCommand = async (command: Omit<Command, "id">) => {
    try {
      await commandService.create(platformId, command);
      fetchCommands();
      setIsModalOpen(false);
      AlertManager.success("Command created successfully");
    } catch (err) {
      AlertManager.error((err as ApiError).message);
    }
  };

  const updateCommand = async (command: Command) => {
    if (!selectedCommand?.id) return;

    try {
      await commandService.update(platformId, selectedCommand.id, command);
      fetchCommands();
      setIsModalOpen(false);
      AlertManager.success("Command updated successfully");
    } catch (err) {
      AlertManager.error((err as ApiError).message);
    }
  };

  const deleteCommand = async () => {
    if (commandToDelete) {
      try {
        await commandService.delete(platformId, commandToDelete);
        fetchCommands();
        setDeleteConfirmOpen(false);
        setCommandToDelete(null);
        AlertManager.success("Command deleted successfully");
      } catch (err) {
        AlertManager.error((err as ApiError).message);
      }
    }
  };

  const openCreateModal = () => {
    setSelectedCommand(undefined);
    setModalMode("create");
    setIsModalOpen(true);
  };

  const openUpdateModal = (command: Command) => {
    setSelectedCommand(command);
    setModalMode("update");
    setIsModalOpen(true);
  };

  const openDeleteConfirm = (commandId: string) => {
    setCommandToDelete(commandId);
    setDeleteConfirmOpen(true);
  };

  const handleModalSubmit = async (command: Command) => {
    if (modalMode === "create") await createCommand(command);
    else await updateCommand(command);
  };

  const fetchCommands = async () => {
    try {
      setLoading(true);
      const data = await commandService.getAll(platformId);
      setCommands(data);
    } catch (err) {
      if (typeof err === "object" && err !== null && "statusCode" in err) {
        if (err.statusCode === 404) setCommands([]);
        else setError(err as ApiError);
      } else {
        setError({
          statusCode: 500,
          message: "An unexpected error occurred",
          error: String(err),
        } as ApiError);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommands();
  }, [platformId]);

  if (loading) {
    return (
      <Grid container justifyContent="center" padding={4}>
        <CircularProgress />
      </Grid>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ margin: 2 }}>
        {error.message}
      </Alert>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        mt={2}
        px={1}
      >
        <Typography variant="h4" component="h1">
          {platformName} Commands
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={openCreateModal}
          size="large"
        >
          Add Command
        </Button>
      </Box>

      {commands.length === 0 ? (
        <Alert severity="info" sx={{ my: 2 }}>
          No commands found for this platform. Click "Add Command" to create
          one.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {commands.map((command) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={command.id}>
              <CommandCard
                command={command}
                onEdit={openUpdateModal}
                onDelete={openDeleteConfirm}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <CommandModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        command={selectedCommand}
        platformId={platformId}
        mode={modalMode}
      />

      <DeleteConfirmationDialog
        isOpen={deleteConfirmOpen}
        title="Delete Command"
        contentText="Are you sure you want to delete this command?"
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={deleteCommand}
      />
    </Container>
  );
}
