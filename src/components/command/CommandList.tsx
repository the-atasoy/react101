import { useState, useEffect } from "react";
import { Grid, Alert, CircularProgress } from "@mui/material";
import { Command } from "../../types/Command";
import { ApiError } from "../../types/error";
import CommandCard from "./CommandCard";
import commandService from "../../services/commandService";

interface CommandListProps {
  platformId: string;
}

export default function CommandList({ platformId }: CommandListProps) {
  const [commands, setCommands] = useState<Command[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    const fetchCommands = async () => {
      try {
        setLoading(true);
        const data = await commandService.getAll(platformId);
        setCommands(data);
      } catch (err) {
        if (typeof err === "object" && err !== null && "statusCode" in err) {
          if (err.statusCode === 404)
            setCommands([]);
          else
            setError(err as ApiError);
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
    <Grid container spacing={2}>
      {commands.map((command) => (
        <Grid item xs={12} sm={6} md={4} key={command.id}>
          <CommandCard command={command} />
        </Grid>
      ))}
    </Grid>
  );
}
