import { useState } from "react";
import { ContactUs } from "../contactus/ContactUs";
import { Modal } from "../modal/Modal";

export function ContactUsWidget() {
  const [visible, setVisible] = useState(false);

  function handleButtonClick() {
    setVisible((prev) => !prev);
  }

  return (
    <>
      {!visible && (
        <button
          className="btn--rounded btn--fixed btn--bottom-right"
          onClick={handleButtonClick}
        >
          <i className="bx bx-envelope"></i>
        </button>
      )}
      <Modal visible={visible}>
        <ContactUs handleCancel={handleButtonClick} />
      </Modal>
    </>
  );
}
