import React, { useEffect, useState } from 'react';
import { 
    Container, 
    Grid, 
    Typography, 
    CircularProgress, 
    Alert 
} from '@mui/material';
import { Platform } from '../../types/Platform';
import { platformService } from '../../services/platformService';
import PlatformCard from './PlatformCard';

export default function PlatformList() {
    const [platforms, setPlatforms] = useState<Platform[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPlatforms = async () => {
            try {
                const data = await platformService.getAll();
                setPlatforms(data);
            } catch (err) {
                setError('Failed to fetch platforms');
            } finally {
                setLoading(false);
            }
        };

        fetchPlatforms();
    }, []);

    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">{error}</Alert>;

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Available Platforms
            </Typography>
            <Grid container spacing={3}>
                {platforms.map((platform) => (
                    <Grid item xs={12} sm={6} md={4} key={platform.id}>
                        <PlatformCard platform={platform} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};