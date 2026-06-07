'use client';

import { useEffect } from 'react';
import { Toast as BsToast, ToastContainer } from 'react-bootstrap';

interface Props {
  show: boolean;
  message: string;
  type: 'success' | 'danger';
  onClose: () => void;
}

export default function Toast({ show, message, type, onClose }: Props) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 9999 }}>
      <BsToast show={show} onClose={onClose} bg={type} autohide delay={3000}>
        <BsToast.Header closeButton>
          <strong className="me-auto">
            {type === 'success' ? '✓ Success' : '✗ Error'}
          </strong>
        </BsToast.Header>
        <BsToast.Body className="text-white">{message}</BsToast.Body>
      </BsToast>
    </ToastContainer>
  );
}
