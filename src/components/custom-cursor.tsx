// src/components/custom-cursor.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', mouseMove);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  useEffect(() => {
    const handleMouseDown = () => setCursorVariant('click');
    const handleMouseUp = () => setCursorVariant('default');
    
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => setCursorVariant('link'));
      el.addEventListener('mouseleave', () => setCursorVariant('default'));
    });

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', () => setCursorVariant('link'));
        el.removeEventListener('mouseleave', () => setCursorVariant('default'));
      });
    };
  }, [cursorVariant]);

  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      height: 16,
      width: 16,
      backgroundColor: 'hsl(var(--accent))',
      mixBlendMode: 'difference' as const,
    },
    link: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: 'hsl(var(--background))',
      border: '2px solid hsl(var(--accent))',
      mixBlendMode: 'normal' as const,
    },
    click: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
      height: 24,
      width: 24,
      backgroundColor: 'hsl(var(--accent))',
      mixBlendMode: 'difference' as const,
      scale: 0.8,
    }
  };

  const spring = {
    type: 'spring',
    stiffness: 500,
    damping: 28,
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full z-[9999] pointer-events-none"
      variants={variants}
      animate={cursorVariant}
      transition={spring}
    />
  );
};
