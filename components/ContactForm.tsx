"use client";

import { useState, useRef, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { useLanguage } from "@/components/LanguageProvider";

interface ContactFormProps {
  onSuccess?: () => void;
}

export default function ContactForm({ onSuccess }: ContactFormProps) {
  const { t } = useLanguage();
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setErrorMessage("");

    const serviceId =
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_fj205gx";
    const templateId =
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_kbxtnmu";
    const publicKey =
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "xpfJOb7nfw-6Zqw0-";

    try {
      // Send message using EmailJS
      // Parameters standard for template: from_name, from_email, subject, message, reply_to
      const templateParams = {
        from_name: formData.name,
        name: formData.name,
        from_email: formData.email,
        email: formData.email,
        reply_to: formData.email,
        subject: formData.subject || "New Portfolio Contact Message",
        message: formData.message,
      };

      await emailjs.send(serviceId, templateId, templateParams, {
        publicKey: publicKey,
      });

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      if (onSuccess) {
        onSuccess();
      }

      // Auto revert success message after 7 seconds
      setTimeout(() => {
        setStatus("idle");
      }, 7000);
    } catch (err: unknown) {
      console.error("EmailJS Error:", err);
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : t("contact.formError")
      );
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="frost-contact-form w-full flex flex-col gap-4 mt-6 text-left"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name input */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-name"
            className="text-xs font-mono uppercase tracking-wider text-ice-300"
          >
            {t("contact.formName")} *
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="frost-input"
          />
        </div>

        {/* Email input */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-email"
            className="text-xs font-mono uppercase tracking-wider text-ice-300"
          >
            {t("contact.formEmail")} *
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="frost-input"
          />
        </div>
      </div>

      {/* Subject input */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contact-subject"
          className="text-xs font-mono uppercase tracking-wider text-ice-300"
        >
          {t("contact.formSubject")}
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Project Inquiry / Opportunity"
          className="frost-input"
        />
      </div>

      {/* Message textarea */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contact-message"
          className="text-xs font-mono uppercase tracking-wider text-ice-300"
        >
          {t("contact.formMessage")} *
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Write your message here..."
          className="frost-input resize-none"
        />
      </div>

      {/* Status alerts */}
      {status === "success" && (
        <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm flex items-center gap-2.5 animate-fadeIn">
          <svg
            className="w-5 h-5 flex-shrink-0 text-emerald-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{t("contact.formSuccess")}</span>
        </div>
      )}

      {status === "error" && (
        <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs sm:text-sm flex items-center gap-2.5 animate-fadeIn">
          <svg
            className="w-5 h-5 flex-shrink-0 text-rose-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{errorMessage || t("contact.formError")}</span>
        </div>
      )}

      {/* Submit button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "loading"}
          data-cursor="hover"
          className="frost-btn frost-btn--primary w-full sm:w-auto justify-center !px-7 !py-3 font-medium transition-all disabled:opacity-60 disabled:cursor-not-allowed group"
        >
          {status === "loading" ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>{t("contact.formSending")}</span>
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
              <span>{t("contact.formSend")}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
