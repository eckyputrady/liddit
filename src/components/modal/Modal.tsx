import React, { ReactNode } from "react";
import "./Modal.css";

export interface ModalProps {
  visible: boolean;
  children: ReactNode;
}

export function Modal({ visible, children }: ModalProps) {
  return (
    visible && (
      <div className="modal--bg">
        <div className="modal">{children}</div>
      </div>
    )
  );
}
