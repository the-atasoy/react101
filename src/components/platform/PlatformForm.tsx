import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { Platform } from '../../types/Platform';

interface PlatformFormProps {
    onSubmit: (platform: Omit<Platform, 'id'>) => void;
}

export default function PlatformForm({ onSubmit }: PlatformFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        publisher: '',
        cost: ''
    });

    return (
        <Box component="form">
            <TextField 
                label="Name"
                fullWidth
                margin="normal"
            />
            <TextField 
                label="Publisher"
                fullWidth
                margin="normal"
            />
            <TextField 
                label="Cost"
                fullWidth
                margin="normal"
            />
        </Box>
    );
}