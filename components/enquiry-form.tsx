"use client";
import { FormEvent, useState } from "react";
const api = process.env.NEXT_PUBLIC_CONTENT_API_ORIGIN || "";
export function EnquiryForm() {
  const [message, setMessage] = useState("");
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!api) {
      setMessage(
        "Enquiry delivery will be enabled after the protected Cloudflare API is configured.",
      );
      return;
    }
    const form = new FormData(e.currentTarget);
    setMessage("Sending…");
    try {
      const r = await fetch(`${api}/v1/enquiries`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          company: form.get("company"),
          serviceInterest: form.get("serviceInterest"),
          message: form.get("message"),
          consent: form.get("consent") === "on",
        }),
      });
      if (!r.ok) throw new Error();
      e.currentTarget.reset();
      setMessage("Thank you. Your enquiry has been received.");
    } catch {
      setMessage("We could not send this enquiry. Please try again shortly.");
    }
  };
  return (
    <form className="enquiryForm" onSubmit={submit}>
      <label>
        Name
        <input name="name" required minLength={2} />
      </label>
      <label>
        Email
        <input name="email" type="email" required />
      </label>
      <label>
        Company
        <input name="company" />
      </label>
      <label>
        Priority service
        <select name="serviceInterest">
          <option>Website design & development</option>
          <option>E-commerce development</option>
          <option>Mobile app development</option>
          <option>Digital marketing</option>
        </select>
      </label>
      <label>
        What should work better?
        <textarea name="message" required minLength={20} />
      </label>
      <label className="consent">
        <input name="consent" type="checkbox" required /> I agree that VS
        Infosys may use these details to respond to this enquiry.
      </label>
      <button type="submit">Send enquiry ↗</button>
      {message && <output>{message}</output>}
    </form>
  );
}
