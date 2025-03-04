import { useState, useEffect } from 'react';
import { Grid, Alert, CircularProgress, Button, Typography, Box, Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Platform } from '../../types/Platform';
import { ApiError } from '../../types/error';
import PlatformCard from './PlatformCard';
import platformService from '../../services/platformService';
import PlatformModal from './PlatformModal';

export default function PlatformList() {
    const [platforms, setPlatforms] = useState<Platform[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<ApiError | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = async (platform: Omit<Platform, 'id'>) => {
        try {
            await platformService.create(platform);
            fetchPlatforms();
            setIsModalOpen(false);
        } catch (err) {
            setError(err as ApiError);
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
                    onClick={() => setIsModalOpen(true)}
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
                    {platforms.map(platform => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={platform.id}>
                            <PlatformCard platform={platform} />
                        </Grid>
                    ))}
                </Grid>
            )}
            
            <PlatformModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
            />
        </Container>
    );
}