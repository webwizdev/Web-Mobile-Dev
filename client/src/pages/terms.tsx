import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-terms">
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm" data-testid="link-back-home">
              <ArrowLeft className="w-4 h-4 mr-2" />Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-[10px] tracking-tight">FIO</span>
            </div>
            <span className="font-bold text-foreground text-sm">Creatives</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-terms-title">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: March 6, 2026</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">1. Agreement to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using the services provided by FIO Creatives ("Company," "we," "us," or "our"), including our website, web applications, mobile applications, and any related services (collectively, the "Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use our Services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">2. Description of Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              FIO Creatives provides web and mobile application development, UI/UX design, digital strategy consulting, and related technology services. Our Services include but are not limited to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
              <li>Custom web application development</li>
              <li>Mobile application development (iOS and Android)</li>
              <li>UI/UX design and prototyping</li>
              <li>Software-as-a-Service (SaaS) platform development</li>
              <li>Technical consulting and digital strategy</li>
              <li>Maintenance and support services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">3. User Accounts</h2>
            <p className="text-muted-foreground leading-relaxed">
              Certain features of our Services may require you to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate and complete. We reserve the right to suspend or terminate your account if any information provided is found to be inaccurate or misleading.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">4. Intellectual Property Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              Unless otherwise agreed in a separate written contract, all intellectual property rights in the Services, including but not limited to software, designs, text, graphics, logos, and trademarks, are owned by FIO Creatives or our licensors. Upon full payment for project-specific deliverables, ownership of custom work product shall transfer to the client as specified in the applicable project agreement. We retain the right to use general knowledge, skills, techniques, and reusable components developed during project work.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">5. Client Responsibilities</h2>
            <p className="text-muted-foreground leading-relaxed">
              Clients engaging our development services agree to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
              <li>Provide timely and accurate project requirements and feedback</li>
              <li>Ensure all content and materials provided to us do not infringe third-party rights</li>
              <li>Make payments according to the agreed-upon schedule</li>
              <li>Designate a primary point of contact for project communication</li>
              <li>Review and approve deliverables within the agreed timeframe</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">6. Payment Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              Payment terms, including pricing, milestones, and schedules, will be outlined in individual project proposals or service agreements. Unless otherwise specified, invoices are due within 30 days of issuance. Late payments may incur interest at a rate of 1.5% per month. We reserve the right to suspend work on any project with outstanding overdue payments.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">7. Project Delivery & Revisions</h2>
            <p className="text-muted-foreground leading-relaxed">
              Project timelines and deliverables will be defined in the project agreement. We will make reasonable efforts to meet agreed-upon deadlines; however, timelines may be adjusted due to scope changes, client delays in providing feedback or materials, or unforeseen technical challenges. Each project includes a defined number of revision rounds as specified in the project agreement. Additional revisions beyond the agreed scope may incur extra charges.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">8. Warranties & Disclaimers</h2>
            <p className="text-muted-foreground leading-relaxed">
              We warrant that our Services will be performed in a professional and workmanlike manner consistent with industry standards. EXCEPT AS EXPRESSLY SET FORTH HEREIN, THE SERVICES ARE PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. We do not warrant that the Services will be uninterrupted, error-free, or completely secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">9. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, FIO CREATIVES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, BUSINESS OPPORTUNITIES, OR GOODWILL, REGARDLESS OF THE CAUSE OF ACTION OR THE THEORY OF LIABILITY. Our total aggregate liability arising out of or related to these Terms shall not exceed the total fees paid by you to us during the twelve (12) months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">10. Confidentiality</h2>
            <p className="text-muted-foreground leading-relaxed">
              Both parties agree to maintain the confidentiality of any proprietary or sensitive information shared during the course of the engagement. This obligation survives the termination of any project agreement and remains in effect for a period of two (2) years following disclosure. Confidential information does not include information that is publicly available, independently developed, or lawfully obtained from a third party.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">11. Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              Either party may terminate a project engagement with 30 days' written notice. In the event of termination, the client is responsible for payment of all work completed up to the termination date. We will provide all completed deliverables upon receipt of final payment. We reserve the right to terminate Services immediately if the client breaches any material term of these Terms or any applicable project agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">12. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be resolved in the state or federal courts located in San Francisco County, California, and both parties consent to the exclusive jurisdiction of such courts.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">13. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify these Terms at any time. Updated Terms will be posted on our website with a revised "Last updated" date. Your continued use of the Services after any such changes constitutes your acceptance of the new Terms. We encourage you to review these Terms periodically.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">14. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions about these Terms, please contact us at:
            </p>
            <div className="mt-3 text-muted-foreground">
              <p className="font-medium text-foreground">FIO Creatives</p>
              <p>Email: info@fiocreatives.com</p>
              <p>Address: 123 Innovation Drive, San Francisco, CA</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
