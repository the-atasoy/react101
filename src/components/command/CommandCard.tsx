import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Command } from '../../types/Command';

interface CommandCardProps {
    command: Command;
}

export default function CommandCard({ command }: CommandCardProps) {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6">{command.howTo}</Typography>
                <Typography variant="body2" color="textSecondary">
                    {command.commandLine}
                </Typography>
            </CardContent>
        </Card>
    );
}