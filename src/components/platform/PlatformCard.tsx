import { useNavigate } from 'react-router-dom';
import { 
    Card, 
    CardContent,
    CardMedia, 
    Typography, 
    CardActionArea,
    Box,
    Chip
} from '@mui/material';
import { Platform } from '../../types/Platform';

interface PlatformCardProps {
    platform: Platform;
}

export default function PlatformCard({ platform }: PlatformCardProps) {
    const navigate = useNavigate();

    const getCostColor = (cost: string | undefined) => {
        if (!cost) return 'default';
        const numericCost = parseFloat(cost.replace(/[^0-9.-]+/g, ""));
        if (isNaN(numericCost) || cost.toLowerCase().includes('free')) return 'success';
        if (numericCost < 50) return 'info';
        if (numericCost < 100) return 'warning';
        return 'error';
    };

    const getInitial = () => {
        if (!platform || !platform.name) return '?';
        return platform.name.charAt(0).toUpperCase();
    };

    if (!platform) {
        return (
            <Card elevation={2} sx={{ height: '100%' }}>
                <CardContent>
                    <Typography>Invalid platform data</Typography>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card 
            elevation={2} 
            sx={{ 
                height: '100%', 
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                }
            }}
        >
            <CardActionArea 
                onClick={() => navigate(`/platforms/${platform.id}/commands`)}
                sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
            >
                <CardMedia
                    component="div"
                    sx={{
                        height: 140,
                        backgroundColor: 'action.hover',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Typography variant="h4" color="text.secondary">
                        {getInitial()}
                    </Typography>
                </CardMedia>
                
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h2" gutterBottom noWrap>
                        {platform.name || 'Unnamed Platform'}
                    </Typography>
                    
                    <Typography color="text.secondary" variant="body2" gutterBottom>
                        {platform.publisher || 'Unknown Publisher'}
                    </Typography>
                    
                    <Box mt={1} display="flex" justifyContent="space-between" alignItems="center">
                        <Chip 
                            label={platform.cost || 'N/A'} 
                            size="small" 
                            color={getCostColor(platform.cost)}
                            variant="outlined"
                        />
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};