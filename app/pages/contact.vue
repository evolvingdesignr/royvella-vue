<script setup lang="ts">
// Validate the reference fields without sending data until an integration is approved.
function validateForm(event: Event) {
  const form = (event.currentTarget as HTMLElement).closest('form') as HTMLFormElement
  for (const name of ['name', 'email', 'message']) {
    const field = form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement
    field.setCustomValidity(field.value.trim() ? '' : 'Please fill out this field.')
  }
  form.reportValidity()
}
function clearValidation(event: Event) {
  const field = event.currentTarget as HTMLInputElement | HTMLTextAreaElement
  field.setCustomValidity('')
}
useSeoMeta({
  title: 'Contact Roy | Roy Vella',
  description: "Whether it's a project, an opportunity, or just a hello, I'd love to hear from you.",
})
</script>

<template>
  <div class="interior-page">
    <SiteHeader />
    <main id="main-content" class="contact-page container-fluid" tabindex="-1">
      <div class="contact-content mx-auto">
        <header class="text-center mb-4 mb-md-5">
          <p class="contact-kicker mb-3">LET'S CONNECT</p>
          <h1 class="contact-title mb-3">Have Something in Mind?</h1>
          <p class="contact-intro mb-0">Whether it's a project, an opportunity, or just a hello, I'd love to hear from you.</p>
        </header>
        <div class="row g-4 g-lg-5 align-items-start">
          <div class="col-lg-6">
            <div class="contact-form-card p-4">
              <form name="contact" aria-labelledby="contact-form-title" aria-describedby="contact-form-status contact-form-unavailable" @submit.prevent="validateForm">
                <h2 id="contact-form-title" class="contact-section-title mb-4">Send Me a Message</h2>
                <div class="mb-3">
                  <label class="form-label fw-semibold" for="contact-name">Name <span class="text-danger" aria-hidden="true">*</span></label>
                  <input id="contact-name" class="form-control" name="name" type="text" autocomplete="name" required @input="clearValidation">
                </div>
                <div class="mb-3">
                  <label class="form-label fw-semibold" for="contact-email">Email <span class="text-danger" aria-hidden="true">*</span></label>
                  <input id="contact-email" class="form-control" name="email" type="email" autocomplete="email" required @input="clearValidation">
                </div>
                <div class="mb-4">
                  <label class="form-label fw-semibold" for="contact-message">Message <span class="text-danger" aria-hidden="true">*</span></label>
                  <textarea id="contact-message" class="form-control" name="message" rows="5" required @input="clearValidation"></textarea>
                </div>
                <!-- Focusable for validation; the handler never submits or clears the message. -->
                <button class="btn btn-dark rounded-pill px-4 py-2 fw-semibold" type="button" aria-disabled="true" aria-describedby="contact-form-unavailable" @click="validateForm">Send Message <span aria-hidden="true">→</span></button>
                <p id="contact-form-status" class="small text-secondary mt-3 mb-0" role="status" aria-live="polite" aria-atomic="true">All fields are required.</p>
                <p id="contact-form-unavailable" class="small text-secondary mt-2 mb-0">Sending is disabled in this development project. No message will be sent. Please email <a class="text-decoration-underline" href="mailto:roy@royvella.com">roy@royvella.com</a> instead.</p>
              </form>
            </div>
          </div>
          <section class="col-lg-6 py-lg-4" aria-labelledby="contact-details-title">
            <h2 id="contact-details-title" class="contact-section-title mb-3">Let's Make Something Happen.</h2>
            <p class="contact-intro mb-4">I'm always interested in connecting with people who have interesting ideas, creative challenges, or opportunities to collaborate.</p>
            <ul class="contact-details list-unstyled d-flex flex-column gap-4 mb-0">
              <li>
                <a class="d-inline-flex align-items-center gap-3" href="mailto:roy@royvella.com">
                  <i class="contact-icon flex-shrink-0 fa-sharp fa-solid fa-envelope" aria-hidden="true"></i>
                  <span>roy@royvella.com</span>
                </a>
              </li>
              <li>
                <a class="d-inline-flex align-items-center gap-3" href="https://www.linkedin.com/in/roy-vella">
                  <i class="contact-icon flex-shrink-0 fa-brands fa-linkedin" aria-hidden="true"></i>
                  <span>LinkedIn</span>
                </a>
              </li>
              <li class="d-flex align-items-center gap-3">
                <i class="contact-icon flex-shrink-0 fa-sharp fa-solid fa-location-dot" aria-hidden="true"></i>
                <span>West Virginia, USA</span>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
</style>
