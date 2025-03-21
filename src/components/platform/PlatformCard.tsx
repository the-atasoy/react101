import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Box,
  Chip,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Platform } from "../../types/Platform";
import React from "react";

interface PlatformCardProps {
  platform: Platform;
  onUpdate: (platform: Platform) => void;
  onDelete: (platformId: string) => void;
}

export default function PlatformCard({
  platform,
  onUpdate,
  onDelete,
}: PlatformCardProps) {
  const navigate = useNavigate();

  const getCostColor = (cost: string | undefined) => {
    if (!cost) return "default";
    const numericCost = parseFloat(cost.replace(/[^0-9.-]+/g, ""));
    if (isNaN(numericCost) || cost.toLowerCase().includes("free"))
      return "success";
    if (numericCost < 50) return "info";
    if (numericCost < 100) return "warning";
    return "error";
  };

  const getInitial = () => {
    if (!platform || !platform.name) return "?";
    return platform.name.charAt(0).toUpperCase();
  };

  const handleUpdateClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdate(platform);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(platform.id!);
  };

  return (
    <Card
      elevation={2}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
    >
      <CardActionArea
        onClick={() => navigate(`/commands/${platform.id}/${encodeURIComponent(platform.name)}`)}
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <CardMedia
          component="div"
          sx={{
            height: 140,
            backgroundColor: "action.hover",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4" color="text.secondary">
            {getInitial()}
          </Typography>
        </CardMedia>

        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 0,
            pt: 1,
            pb: 1,
          }}
        >
          <Box>
            <Typography mb={0} variant="h6" component="h2" gutterBottom noWrap>
              {platform.name || "Unnamed Platform"}
            </Typography>
          </Box>

          <Box>
            <Typography
              mb={0}
              color="text.secondary"
              variant="body2"
              gutterBottom
            >
              {platform.publisher || "Unknown Publisher"}
            </Typography>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Chip
              label={platform.cost || "N/A"}
              size="small"
              color={getCostColor(platform.cost)}
              variant="outlined"
            />

            <Box display="flex" gap={1}>
              <IconButton
                component="span"
                aria-label="edit"
                sx={{
                  color: "#D5780D",
                  cursor: "pointer",
                }}
                onMouseDown={(event) => event.stopPropagation()}
                onClick={(event) => {
                  handleUpdateClick(event);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                component="span"
                aria-label="delete"
                sx={{
                  color: "#AE0611",
                  cursor: "pointer",
                }}
                onMouseDown={(event) => event.stopPropagation()}
                onClick={(event) => {
                  handleDeleteClick(event);
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
