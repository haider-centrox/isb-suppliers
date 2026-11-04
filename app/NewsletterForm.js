"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return <p className="form-done">Thanks! We&apos;ll send our new collection to your inbox.</p>;
  }

  return (
    <form
      className="newsletter"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <label htmlFor="email" className="sr-only">
        Email address
      </label>
      <input id="email" type="email" required placeholder="you@example.com" />
      <button type="submit" className="btn btn-gold">
        Subscribe
      </button>
    </form>
  );
}
