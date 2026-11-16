<script setup lang="ts">
const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')
const route = useRoute()
const isSuccessPreview = computed(() => route.query.preview === 'success')
const confirmationHeading = ref<HTMLElement | null>(null)
let submitting = false

function clearValidation(event: Event) {
  const field = event.currentTarget as HTMLInputElement | HTMLTextAreaElement
  field.setCustomValidity('')
  if (status.value === 'error') status.value = 'idle'
}

async function submitContact(event: Event) {
  const form = event.currentTarget as HTMLFormElement
  if (submitting) return

  for (const name of ['name', 'email', 'message']) {
    const field = form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement
    field.setCustomValidity(field.value.trim() ? '' : 'Please fill out this field.')
  }
  if (!form.reportValidity()) return

  submitting = true
  status.value = 'sending'
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 20000)

  try {
    const body = new URLSearchParams()
    new FormData(form).forEach((value, key) => body.append(key, String(value)))
    const response = await fetch('/__forms.html', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
      signal: controller.signal,
    })
    if (!response.ok) throw new Error('Submission failed')
    form.reset()
    status.value = 'success'
    await nextTick()
    confirmationHeading.value?.focus()
  } catch {
    status.value = 'error'
  } finally {
    clearTimeout(timeout)
    submitting = false
  }
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
              <section v-if="status === 'success' || isSuccessPreview" class="contact-confirmation" aria-labelledby="contact-success-title" aria-describedby="contact-success-description">
                <p v-if="isSuccessPreview" class="small text-secondary mb-3" role="status">Preview mode · No message was sent.</p>
                <div class="d-flex align-items-center gap-3 mb-3">
                  <div class="contact-success-avatar flex-shrink-0 position-relative" aria-hidden="true">
                    <img src="/assets/avatars/contact-avatar.svg" alt="" width="72" height="80" decoding="async">
                    <i class="contact-success-check fa-sharp fa-solid fa-circle-check position-absolute" aria-hidden="true"></i>
                  </div>
                  <div class="min-w-0">
                    <p class="contact-success-label text-uppercase fw-semibold mb-1">Message sent successfully</p>
                    <h2 id="contact-success-title" ref="confirmationHeading" class="contact-section-title mb-0" tabindex="-1">Thanks for reaching out!</h2>
                  </div>
                </div>
                <p id="contact-success-description" class="contact-intro mb-0">Your message is on its way. I'll review it and get back to you as soon as I can.</p>
                <div class="contact-success-footer d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-3 mt-4 pt-3 border-top">
                  <p class="small text-secondary mb-0">In the meantime, feel free to explore my work.</p>
                  <NuxtLink to="/work" class="btn btn-dark rounded-pill px-3 py-2 flex-shrink-0">View My Work <i class="fa-sharp fa-solid fa-arrow-right ms-2" aria-hidden="true"></i></NuxtLink>
                </div>
              </section>
              <form v-else name="contact" method="POST" action="/__forms.html" data-netlify="true" netlify-honeypot="bot-field" aria-labelledby="contact-form-title" aria-describedby="contact-form-status" @submit.prevent="submitContact">
                <input type="hidden" name="form-name" value="contact">
                <p hidden><label>Leave this field empty: <input name="bot-field" type="text" tabindex="-1" autocomplete="off"></label></p>
                <h2 id="contact-form-title" class="contact-section-title mb-4">Send Me a Message</h2>
                <div class="mb-3">
                  <label class="form-label fw-semibold" for="contact-name">Name <span class="text-danger" aria-hidden="true">*</span></label>
                  <input id="contact-name" class="form-control" name="name" type="text" autocomplete="name" required :readonly="status === 'sending'" @input="clearValidation">
                </div>
                <div class="mb-3">
                  <label class="form-label fw-semibold" for="contact-email">Email <span class="text-danger" aria-hidden="true">*</span></label>
                  <input id="contact-email" class="form-control" name="email" type="email" autocomplete="email" required :readonly="status === 'sending'" @input="clearValidation">
                </div>
                <div class="mb-4">
                  <label class="form-label fw-semibold" for="contact-message">Message <span class="text-danger" aria-hidden="true">*</span></label>
                  <textarea id="contact-message" class="form-control" name="message" rows="5" required :readonly="status === 'sending'" @input="clearValidation"></textarea>
                </div>
                <button class="btn btn-dark rounded-pill px-4 py-2 fw-semibold" type="submit" :disabled="status === 'sending'" :aria-busy="status === 'sending'" aria-describedby="contact-form-status">{{ status === 'sending' ? 'Sending…' : 'Send Message' }} <span aria-hidden="true">→</span></button>
                <p id="contact-form-status" class="small text-secondary mt-3 mb-0" :role="status === 'error' ? 'alert' : 'status'" :aria-live="status === 'error' ? 'assertive' : 'polite'" aria-atomic="true">
                  <template v-if="status === 'idle'">All fields are required.</template>
                  <template v-else-if="status === 'sending'">Sending your message…</template>
                  <template v-else>We couldn't confirm your submission. Your message is still here. Try again, or email <a href="mailto:roy@royvella.com">roy@royvella.com</a>.</template>
                </p>
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
