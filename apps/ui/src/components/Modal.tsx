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
      <div className="fixed inset-0 flex justify-center items-center  overflow-y-auto h-full bg-opacity-20 bg-black">
        <div className="flex flex-row  items-center justify-center text-center sm:items-center sm:p-0   w-full  ">
          <div ref={modalRef}>{children}</div>
        </div>
      </div>
    </div>
  );
};
