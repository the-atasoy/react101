import { useState, useEffect } from "react";
import {
  Grid,
  Alert,
  CircularProgress,
  Typography,
  Box,
  Button,
  Container,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Command } from "../../types/Command";
import { ApiError } from "../../types/error";
import CommandCard from "./CommandCard";
import commandService from "../../services/commandService";
import CommandModal from "./CommandModal";
import { AlertManager } from "../../contexts/AlertContext";

interface CommandListProps {
  platformId: string;
}

export default function CommandList({ platformId }: CommandListProps) {
  const [commands, setCommands] = useState<Command[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "update">("create");
  const [selectedCommand, setSelectedCommand] = useState<Command | undefined>(undefined);

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
      await commandService.update(platformId, command);
      fetchCommands();
      setIsModalOpen(false);
      AlertManager.success("Command updated successfully");
    } catch (err) {
      AlertManager.error((err as ApiError).message);
    }
  };


  const openCreateModal = () => {
    setSelectedCommand(undefined);
    setModalMode("create");
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (platform: Omit<Command, "id">) => {
      if (modalMode === "create") {
        await createCommand(platform);
      } else {
        await updateCommand(platform);
      }
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
          Commands
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
      {commands.map((command) => (
        <Grid item xs={12} sm={6} md={4} key={command.id}>
          <CommandCard command={command} />
        </Grid>
      ))}

      <CommandModal
      isOpen = {isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSubmit={handleModalSubmit}
      command={selectedCommand}
      platformId={platformId}
      mode={modalMode}/>
    </Container>
  );
}
