'use client';
import { useState } from 'react';
import AssistantButton from './components/assisstant_btn';
import AssistantDialog from './components/assisstant_dialog';

const AskAssistant = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AssistantButton onClick={() => setOpen(true)} />
      <AssistantDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default AskAssistant;
