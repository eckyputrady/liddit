import "./ContactUs.css";

export interface ContactUsProps {
  handleCancel: () => void;
}

export function ContactUs(props: ContactUsProps) {
  return (
    <div className="contactUs">
      <h1>
        <i className="bx bx-envelope"></i>
      </h1>
      <h2>Contact Us Via Email</h2>
      <p>
        Any questions? Send us an email at something@hhh.com. We Usually answer
        within 24 hours.
      </p>
      <p>
        <a
          href="#"
          className="contactUs--btn-cancel"
          onClick={props.handleCancel}
        >
          Cancel
        </a>
        <a className="contactUs--btn-email" href="mailto:something@hhh.com">
          Open Email App
        </a>
      </p>
    </div>
  );
}
