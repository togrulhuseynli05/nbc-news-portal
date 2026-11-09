import { useState } from "react";


export default function NewsletterSignup({ authorName }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!email.includes("@")) {
      setMessage("Düzgün e-poçt ünvanı daxil edin.");
      return;
    }

    setMessage(`Təşəkkürlər${name ? ", " + name : ""}! Abunəlik qeyd olundu (mock).`);
    setName("");
    setEmail("");
  }

  return (
    <section className="newsletter">
      <h3 className="newsletter__title">Sign up for The NBC News Newsletter</h3>
      <p className="newsletter__by">By {authorName}</p>
      <p className="newsletter__text">A weekly newsletter that helps readers stay informed.</p>

      <form className="newsletter__form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Adınız" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="E-poçt ünvanınız" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit" className="newsletter__btn">
          <img src="icons/envelope.svg" alt="" />
          GET THIS NEWSLETTER
        </button>
      </form>

      {message && <p className="newsletter__message">{message}</p>}
    </section>
  );
}
