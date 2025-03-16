import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Tooltip,
  CardHeader,
  Divider,
  CardActions,
  alpha,
  Paper,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TerminalIcon from "@mui/icons-material/Terminal";
import { Command } from "../../types/Command";
import { AlertManager } from "../../contexts/AlertContext";

interface CommandCardProps {
  command: Command;
  onEdit?: (command: Command) => void;
  onDelete?: (commandId: string) => void;
}

export default function CommandCard({
  command,
  onEdit,
  onDelete,
}: CommandCardProps) {
  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(command.commandLine)
      .then(() => AlertManager.success("Command copied to clipboard"))
      .catch(() => AlertManager.error("Failed to copy command"));
  };

  const handleEditClick = () => {
    if (onEdit) onEdit(command);
  };

  const handleDeleteClick = () => {
    if (onDelete && command.id) onDelete(command.id);
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
        mb: 2,
        overflow: "visible",
      }}
    >
      <CardHeader
        avatar={
          <Box
            sx={{
              bgcolor: "primary.main",
              color: "primary.contrastText",
              width: 36,
              height: 36,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TerminalIcon fontSize="small" />
          </Box>
        }
        title={
          <Typography 
            variant="subtitle1" 
            noWrap 
            title={command.howTo}
            sx={{ maxWidth: "200px" }}
          >
            {command.howTo}
          </Typography>
        }
        sx={{ pb: 0 }}
      />

      <CardContent sx={{ pt: 1, pb: 1, flexGrow: 1 }}>
        <Paper
          elevation={0}
          sx={{
            bgcolor: (theme) => alpha(theme.palette.common.black, 0.05),
            p: 1.5,
            borderRadius: 1,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Typography
            variant="body2"
            component="div"
            sx={{
              overflowX: "auto",
              whiteSpace: "nowrap",
              fontFamily: "monospace",
              fontWeight: "medium",
              color: (theme) => theme.palette.text.primary,
              pr: 4,
            }}
          >
            <div style={{ 
              maxWidth: "100%", 
              textOverflow: "ellipsis", 
              overflow: "hidden" 
            }}>
              {command.commandLine}
            </div>
          </Typography>

          <Tooltip title="Copy to clipboard">
            <IconButton
              size="small"
              onClick={handleCopyClick}
              sx={{
                position: "absolute",
                right: 4,
                top: 4,
                opacity: 0.6,
                "&:hover": { opacity: 1 },
              }}
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Paper>
      </CardContent>

      <Divider />

      <CardActions
        disableSpacing
        sx={{ justifyContent: "flex-end", pt: 0.5, pb: 0.5 }}
      >
        <Box>
          {onEdit && (
            <Tooltip title="Edit">
              <IconButton
                size="small"
                onClick={handleEditClick}
                sx={{ color: "#D5780D" }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}

          {onDelete && (
            <Tooltip title="Delete">
              <IconButton
                size="small"
                onClick={handleDeleteClick}
                sx={{ color: "#AE0611" }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </CardActions>
    </Card>
  );
}
