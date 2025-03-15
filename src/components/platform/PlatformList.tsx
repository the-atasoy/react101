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
  const [platformToDelete, setPlatformToDelete] = useState<string | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  const createPlatform = async (platform: Omit<Platform, "id">) => {
    try {
      await platformService.create(platform);
      fetchPlatforms();
      setIsModalOpen(false);
      AlertManager.success("Platform created successfully");
    } catch (err) {
      AlertManager.error((err as ApiError).message);
    }
  };

  const updatePlatform = async (platform: Omit<Platform, "id">) => {
    if (!selectedPlatform?.id) return;

    try {
      await platformService.update(selectedPlatform.id, platform);
      fetchPlatforms();
      setIsModalOpen(false);
      AlertManager.success("Platform updated successfully");
    } catch (err) {
      AlertManager.error((err as ApiError).message);
    }
  };

  const deletePlatform = async () => {
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

  const openCreateModal = () => {
    setSelectedPlatform(undefined);
    setModalMode("create");
    setIsModalOpen(true);
  };

  const openUpdateModal = (platform: Platform) => {
    setSelectedPlatform(platform);
    setModalMode("update");
    setIsModalOpen(true);
  };

  const openDeleteConfirm = (platformId: string) => {
    setPlatformToDelete(platformId);
    setDeleteConfirmOpen(true);
  };

  const handleModalSubmit = async (platform: Omit<Platform, "id">) => {
    if (modalMode === "create") await createPlatform(platform);
    else await updatePlatform(platform);
  };

  const fetchPlatforms = async () => {
    try {
      setLoading(true);
      const data = await platformService.getAll();
      setPlatforms(data);
    } catch (err) {
      if (typeof err === "object" && err !== null && "statusCode" in err) {
        if (err.statusCode === 404) setPlatforms([]);
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
          onClick={openCreateModal}
          size="large"
        >
          Add Platform
        </Button>
      </Box>

      {platforms.length === 0 ? (
        <Alert severity="info" sx={{ my: 2 }}>
          No platforms found. Click "Add Platform" to create one.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {platforms.map((platform) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={platform.id}>
              <PlatformCard
                platform={platform}
                onUpdate={openUpdateModal}
                onDelete={openDeleteConfirm}
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
        isOpen={deleteConfirmOpen}
        title="Delete Platform"
        contentText="Are you sure you want to delete this platform? This will also remove all associated commands."
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={deletePlatform}
      />
    </Container>
  );
}
