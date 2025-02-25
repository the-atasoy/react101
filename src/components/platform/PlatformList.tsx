import { useState, useEffect } from 'react';
import { Grid, Alert, CircularProgress } from '@mui/material';
import { Platform } from '../../types/Platform';
import { ApiError } from '../../types/error';
import PlatformCard from './PlatformCard';
import platformService from '../../services/platformService';

export default function PlatformList() {
    const [platforms, setPlatforms] = useState<Platform[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<ApiError | null>(null);

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
    useEffect(() => {
        fetchPlatforms();
    }, []);

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
        <Grid container spacing={2} padding={2}>
            {platforms.map(platform => (
                <Grid item xs={12} sm={6} md={4} key={platform.id}>
                    <PlatformCard platform={platform} />
                </Grid>
            ))}
        </Grid>
    );
}