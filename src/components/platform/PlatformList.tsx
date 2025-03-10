import { useState, useEffect } from "react";
import {
  Grid,
  Alert,
  CircularProgress,
  Button,
  Typography,
  Box,
  Container,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Platform } from "../../types/Platform";
import { ApiError } from "../../types/error";
import PlatformCard from "./PlatformCard";
import platformService from "../../services/platformService";
import PlatformModal from "./PlatformModal";
import DeleteConfirmationDialog from "../common/DeleteConfirmationDialog";
import { AlertManager } from "../../contexts/AlertContext";

export default function PlatformList() {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "update">("create");
  const [selectedPlatform, setSelectedPlatform] = useState<
    Platform | undefined
  >(undefined);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [platformToDelete, setPlatformToDelete] = useState<string | null>(null);

  const handleCreate = async (platform: Omit<Platform, "id">) => {
    try {
      await platformService.create(platform);
      fetchPlatforms();
      setIsModalOpen(false);
      AlertManager.success("Platform created successfully");
    } catch (err) {
      AlertManager.error((err as ApiError).message);
    }
  };

  const handleUpdate = async (platform: Omit<Platform, "id">) => {
    if (!selectedPlatform?.id) return;

    try {
      await platformService.update(selectedPlatform.id, platform);
      fetchPlatforms();
      setIsModalOpen(false);
      AlertManager.success("Platform updated successfully");
    } catch (err) {
      console.log(err);
      AlertManager.error((err as ApiError).message);
    }
  };

  const handleEdit = (platform: Platform) => {
    setSelectedPlatform(platform);
    setModalMode("update");
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedPlatform(undefined);
    setModalMode("create");
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (platform: Omit<Platform, "id">) => {
    if (modalMode === "create") {
      await handleCreate(platform);
    } else {
      await handleUpdate(platform);
    }
  };

  const fetchPlatforms = async () => {
    try {
      setLoading(true);
      const data = await platformService.getAll();
      setPlatforms(data);
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (platformId: string) => {
    setPlatformToDelete(platformId);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (platformToDelete) {
      try {
        await platformService.delete(platformToDelete);
        fetchPlatforms();
        setDeleteConfirmOpen(false);
        setPlatformToDelete(null);
        AlertManager.success("Platform deleted successfully");
      } catch (err) {
        AlertManager.error((err as ApiError).message);
      }
    }
  };

  useEffect(() => {
    fetchPlatforms();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="center" padding={4}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Alert severity="error" sx={{ margin: 2 }}>
          {error.message}
        </Alert>
      </Container>
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
          Platforms
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddNew}
          size="large"
        >
          Add Platform
        </Button>
      </Box>

      {platforms.length === 0 ? (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            No platforms found
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            Get started by adding your first platform
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setIsModalOpen(true)}
          >
            Add Platform
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {platforms.map((platform) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={platform.id}>
              <PlatformCard
                platform={platform}
                onUpdate={handleEdit}
                onDelete={handleDeleteClick}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <PlatformModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        platform={selectedPlatform}
        mode={modalMode}
      />

      <DeleteConfirmationDialog
        open={deleteConfirmOpen}
        title="Delete Platform"
        contentText="Are you sure you want to delete this platform? This will also remove all associated commands."
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={confirmDelete}
      />
    </Container>
  );
}
