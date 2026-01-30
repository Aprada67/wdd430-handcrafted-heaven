'use client'

import React, { FormEvent } from 'react'

export default function ContactForm() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert('Form submitted!')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex flex-col gap-4 w-full"
    >
      {/* Name */}
      <div className="flex flex-col">
        <label htmlFor="name" className="mb-1 text-sm text-primary-text-color">
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Your Name"
          className="rounded border border-primary-elements-background-color px-3 py-2 focus:outline-none"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col">
        <label htmlFor="email" className="mb-1 text-sm text-primary-text-color">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="your_email@gmail.com"
          className="rounded border border-primary-elements-background-color px-3 py-2 focus:outline-none"
        />
      </div>

      {/* Message */}
      <div className="flex flex-col">
        <label htmlFor="message" className="mb-1 text-sm text-primary-text-color">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="Write your message..."
          className="rounded border border-primary-elements-background-color px-3 py-2 focus:outline-none"
        />
      </div>

      {/* Button */}
      <button type="submit" className="btn btn-primary mt-4">
        Send message
      </button>
    </form>
  )
}
