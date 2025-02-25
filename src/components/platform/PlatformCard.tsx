import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Card, 
    CardContent, 
    Typography, 
    CardActionArea 
} from '@mui/material';
import { Platform } from '../../types/Platform';

interface PlatformCardProps {
    platform: Platform;
}

export default function PlatformCard({ platform }: PlatformCardProps) {
    const navigate = useNavigate();

    return (
        <Card>
            <CardActionArea onClick={() => navigate(`/platforms/${platform.id}/commands`)}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {platform.name}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                        Publisher: {platform.publisher}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Cost: {platform.cost}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};