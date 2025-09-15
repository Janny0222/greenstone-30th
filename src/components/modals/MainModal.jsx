import {
  Dialog,
  DialogBackdrop,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import React, { Fragment, useRef } from "react";

const MainModal = ({ modalOpen, setModalOpen, children }) => {
  const cancelButtonRef = useRef(null);
  return (
    <>
      <Transition show={modalOpen} as={Fragment} appear>
        <Dialog
          open={modalOpen}
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto text-center"
          initialFocus={cancelButtonRef}
          onClose={() => setModalOpen(false)}
        >
          <div className="min-h-screen px-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-[300ms]"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0"
            >
              <DialogBackdrop className="fixed inset-0 backdrop-blur-sm bg-palette-background-accent bg-opacity-50" />
            </TransitionChild>

            <span
              className="inline-block text-white h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <TransitionChild
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-90"
              enterTo="opacity-100 scale-100"
              leave="ease-in scale-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0 scale-95"
            >
              {children}
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default MainModal;
