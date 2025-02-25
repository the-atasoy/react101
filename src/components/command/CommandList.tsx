import React from 'react';

import { Grid, Typography } from '@mui/material';
import { Command } from '../../types/Command';
import CommandCard from './CommandCard';

interface CommandListProps {
    commands: Command[];
}

export default function CommandList({ commands }: CommandListProps) {
    return (
        <Grid container spacing={2}>
            {commands.map(command => (
                <Grid item xs={12} sm={6} md={4} key={command.id}>
                    <CommandCard command={command} />
                </Grid>
            ))}
        </Grid>
    );
}