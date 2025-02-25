import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { Command } from '../../types/Command';

interface CommandFormProps {
    onSubmit: (command: Omit<Command, 'id'>) => void;
}

export default function CommandForm({ onSubmit }: CommandFormProps) {
    const [formData, setFormData] = useState({
        howTo: '',
        commandLine: ''
    });

    return (
        <Box component="form">
            <TextField 
                label="How To"
                fullWidth
                margin="normal"
            />
            <TextField 
                label="Command Line"
                fullWidth
                margin="normal"
            />
        </Box>
    );
}