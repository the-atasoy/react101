import React, { useState } from 'react';
import { Box, TextField, Button, Alert, Snackbar } from '@mui/material';
import { Command } from '../../types/Command';
import { ApiError } from '../../types/error';
import commandService from '../../services/commandService';

interface CommandFormProps {
    platformId: string;
    onSubmit: (command: Omit<Command, 'id'>) => void;
}

export default function CommandForm({ platformId, onSubmit }: CommandFormProps) {
    const [formData, setFormData] = useState({
        howTo: '',
        commandLine: ''
    });
    const [error, setError] = useState<ApiError | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const commandData = { ...formData, platformId };
            await commandService.create(platformId, commandData);
            onSubmit(commandData);
            setFormData({ howTo: '', commandLine: '' });
        } catch (err) {
            setError(err as ApiError);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <TextField 
                label="How To"
                fullWidth
                margin="normal"
                value={formData.howTo}
                onChange={(e) => setFormData({...formData, howTo: e.target.value})}
                disabled={isSubmitting}
                error={!!error}
            />
            <TextField 
                label="Command Line"
                fullWidth
                margin="normal"
                value={formData.commandLine}
                onChange={(e) => setFormData({...formData, commandLine: e.target.value})}
                disabled={isSubmitting}
                error={!!error}
            />
            <Button 
                type="submit" 
                variant="contained" 
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Submitting...' : 'Add Command'}
            </Button>
            
            <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
                <Alert severity="error" onClose={() => setError(null)}>
                    {error?.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}