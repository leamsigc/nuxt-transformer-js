<script setup lang="ts">
/**
 *
 * Component Description:Desc
 *
 * @author Reflect-Media <reflect.media GmbH>
 * @version 0.0.1
 *
 * @todo [ ] Test the component
 * @todo [ ] Integration test.
 * @todo [✔] Update the typescript.
 */
interface ContactFormeProps {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

const contactForm = reactive<ContactFormeProps>({
  firstName: "",
  lastName: "",
  email: "",
  subject: "",
  message: "",
});

const invalidUiInputForm = ref<boolean>(false);

const handleSubmit = () => {
  const { firstName, lastName, email, subject, message } = contactForm;

  const mailToLink = `mailto:leomirandadev@gmail.com?subject=${subject}&body=Hello I am ${firstName} ${lastName}, my Email is ${email}. %0D%0A${message}`;

  window.location.href = mailToLink;
};
</script>

<template>
  <section id="contact" class="container py-24 sm:py-32">
    <section class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <div class="mb-4">
          <h2 class="text-lg text-primary mb-2 tracking-wider">Contact</h2>

          <h2 class="text-3xl md:text-4xl font-bold">Connect With Us</h2>
        </div>
        <p class="mb-8 text-muted-foreground lg:w-5/6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum ipsam sint
          enim exercitationem ex autem corrupti quas tenetur
        </p>

        <div class="flex flex-col gap-4">
          <div>
            <div class="flex gap-2 mb-1">
              <Icon name="lucide:map-pin" />
              <div class="font-bold">Find Us</div>
            </div>

            <div>742 Evergreen Terrace, Springfield, IL 62704</div>
          </div>

          <div>
            <div class="flex gap-2 mb-1">
              <Icon name="lucide:phone" />
              <div class="font-bold">Call Us</div>
            </div>

            <div>+1 (619) 123-4567</div>
          </div>

          <div>
            <div class="flex gap-2 mb-1">
              <Icon name="lucide:mail" />
              <div class="font-bold">Mail Us</div>
            </div>

            <div>leomirandadev@gmail.com</div>
          </div>

          <div>
            <div class="flex gap-2">
              <Icon name="lucide:home" />
              <div class="font-bold">Visit Us</div>
            </div>

            <div>
              <div>Monday - Friday</div>
              <div>8AM - 4PM</div>
            </div>
          </div>
        </div>
      </div>

      <!-- form -->
      <UiCard class="bg-muted/60 dark:bg-card">
        <UiCardHeader class="text-primary text-2xl" />
        <UiCardContent>
          <form class="grid gap-4" @submit.prevent="handleSubmit">
            <div class="flex flex-col md:flex-row gap-8">
              <div class="flex flex-col w-full gap-1.5">
                <UiLabel for="first-name">First Name</UiLabel>
                <UiInput id="first-name" v-model="contactForm.firstName" type="text" placeholder="Leopoldo" />
              </div>

              <div class="flex flex-col w-full gap-1.5">
                <UiLabel for="last-name">Last Name</UiLabel>
                <UiInput id="last-name" v-model="contactForm.lastName" type="text" placeholder="Miranda" />
              </div>
            </div>

            <div class="flex flex-col gap-1.5">
              <UiLabel for="email">Email</UiLabel>
              <UiInput id="email" v-model="contactForm.email" type="email" placeholder="leomirandadev@gmail.com" />
            </div>

            <div class="flex flex-col gap-1.5">
              <UiLabel for="subject">Subject</UiLabel>

              <UiSelect v-model="contactForm.subject">
                <UiSelectTrigger aria-label="Customise options">
                  <UiSelectValue placeholder="Select a subject" aria-label="Select a subject" />
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectGroup>
                    <UiSelectItem value="Web Development"> Web Development </UiSelectItem>
                    <UiSelectItem value="Mobile Development">
                      Mobile Development
                    </UiSelectItem>
                    <UiSelectItem value="Figma Design"> Figma Design </UiSelectItem>
                    <UiSelectItem value="REST API "> REST API </UiSelectItem>
                    <UiSelectItem value="FullStack Project">
                      FullStack Project
                    </UiSelectItem>
                  </UiSelectGroup>
                </UiSelectContent>
              </UiSelect>
            </div>

            <div class="flex flex-col gap-1.5">
              <UiLabel for="message">Message</UiLabel>
              <UiTextarea id="message" v-model="contactForm.message" placeholder="Your message..." rows="5" />
            </div>

            <UiAlert v-if="invalidUiInputForm" variant="destructive">
              <Icon name="lucide:alert-circle" class="w-4 h-4" />
              <UiAlertTitle>Error</UiAlertTitle>
              <UiAlertDescription>
                There is an error in the form. Please check your input.
              </UiAlertDescription>
            </UiAlert>

            <UiButton class="mt-4">Send message</UiButton>
          </form>
        </UiCardContent>

        <UiCardFooter />
      </UiCard>
    </section>
  </section>
</template>
