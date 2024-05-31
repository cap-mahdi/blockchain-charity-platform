import { FC, ReactNode } from 'react';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { log } from 'console';

interface ModalProps {
  children?: ReactNode;
  onClose?: () => void;
}
export const Modal = ({ children, onClose = () => {} }) => {
  const modalRef = useOutsideClick({
    handler: () => {
      console.log('click outside');
      onClose();
    },
  });
  return (
    <div
      className="relative z-10 flex justify-center items-center "
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 blur-2xl bg-gray bg-opacity-30 transition-opacity"></div>
      <div className="fixed inset-0   overflow-y-auto">
        <div
          className="flex  min- items-end justify-center text-center sm:items-center sm:p-0 bg-black "
          ref={modalRef}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
