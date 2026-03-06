import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-privacy">
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
        <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-privacy-title">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: March 6, 2026</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              FIO Creatives ("Company," "we," "us," or "our") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you visit our website, use our web applications, mobile applications, or engage our services (collectively, the "Services"). Please read this Privacy Policy carefully. By using our Services, you consent to the practices described in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">2. Information We Collect</h2>

            <h3 className="text-lg font-medium text-foreground mb-2 mt-4">2.1 Information You Provide</h3>
            <p className="text-muted-foreground leading-relaxed">We collect information that you voluntarily provide to us, including:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
              <li><strong>Contact Information:</strong> Name, email address, phone number, company name, and mailing address when you fill out forms, request a quote, or contact us</li>
              <li><strong>Account Information:</strong> Username, password, and profile details if you create an account on our platforms</li>
              <li><strong>Project Information:</strong> Project requirements, specifications, content, and other materials you provide for development services</li>
              <li><strong>Payment Information:</strong> Billing address and payment details processed through our secure third-party payment processors</li>
              <li><strong>Communications:</strong> Messages, feedback, and correspondence you send to us</li>
            </ul>

            <h3 className="text-lg font-medium text-foreground mb-2 mt-4">2.2 Information Collected Automatically</h3>
            <p className="text-muted-foreground leading-relaxed">When you access our Services, we may automatically collect:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
              <li><strong>Device Information:</strong> Device type, operating system, browser type, screen resolution, and unique device identifiers</li>
              <li><strong>Usage Data:</strong> Pages visited, features used, click patterns, session duration, and interaction data</li>
              <li><strong>Log Data:</strong> IP address, access times, referring URLs, and error logs</li>
              <li><strong>Cookies & Similar Technologies:</strong> We use cookies, web beacons, and similar tracking technologies to enhance your experience and gather analytics data</li>
            </ul>

            <h3 className="text-lg font-medium text-foreground mb-2 mt-4">2.3 Information from Third Parties</h3>
            <p className="text-muted-foreground leading-relaxed">
              We may receive information about you from third-party sources, including business partners, analytics providers, advertising networks, and publicly available sources, which we may combine with other information we collect about you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">3. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed">We use the information we collect for the following purposes:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
              <li>To provide, maintain, and improve our Services</li>
              <li>To process and fulfill your service requests and project engagements</li>
              <li>To communicate with you about projects, updates, and support</li>
              <li>To send promotional communications (with your consent where required)</li>
              <li>To personalize your experience and deliver relevant content</li>
              <li>To analyze usage patterns and optimize our Services</li>
              <li>To detect, prevent, and address security issues and fraud</li>
              <li>To comply with legal obligations and enforce our Terms of Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">4. How We Share Your Information</h2>
            <p className="text-muted-foreground leading-relaxed">We do not sell your personal information. We may share your information in the following circumstances:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
              <li><strong>Service Providers:</strong> With trusted third-party vendors who assist us in operating our business (hosting, analytics, payment processing, email delivery), bound by confidentiality agreements</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, reorganization, or sale of assets, your information may be transferred as a business asset</li>
              <li><strong>Legal Requirements:</strong> When required by law, regulation, legal process, or governmental request</li>
              <li><strong>Protection of Rights:</strong> To protect the rights, property, or safety of FIO Creatives, our clients, or the public</li>
              <li><strong>With Your Consent:</strong> When you have given explicit consent for a specific sharing purpose</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">5. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement industry-standard technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption of data in transit and at rest, access controls, regular security assessments, and secure development practices. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">6. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including to satisfy legal, accounting, or reporting requirements. The retention period depends on the context of our relationship and the nature of the data. When personal information is no longer needed, we will securely delete or anonymize it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">7. Your Rights & Choices</h2>
            <p className="text-muted-foreground leading-relaxed">Depending on your jurisdiction, you may have the following rights regarding your personal information:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete personal information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information, subject to legal obligations</li>
              <li><strong>Portability:</strong> Request a copy of your data in a structured, machine-readable format</li>
              <li><strong>Opt-Out:</strong> Opt out of marketing communications at any time by clicking "unsubscribe" or contacting us</li>
              <li><strong>Restriction:</strong> Request restriction of processing under certain circumstances</li>
              <li><strong>Objection:</strong> Object to processing based on legitimate interests</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              To exercise any of these rights, please contact us using the information provided below. We will respond to your request within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">8. Cookies & Tracking Technologies</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use cookies and similar technologies to collect usage information and improve our Services. Types of cookies we use include:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1 mt-2">
              <li><strong>Essential Cookies:</strong> Required for basic functionality such as authentication and security</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our Services</li>
              <li><strong>Preference Cookies:</strong> Remember your settings and preferences (e.g., dark mode, language)</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              You can manage cookie preferences through your browser settings. Disabling certain cookies may affect the functionality of our Services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">9. Mobile Applications</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you use our mobile applications, we may collect additional information including device identifiers, push notification tokens, and location data (with your permission). Mobile applications may also access device features such as the camera, photo library, or contacts only when you grant explicit permission. You can manage these permissions through your device settings at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">10. Third-Party Links & Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our Services may contain links to third-party websites, applications, or services. We are not responsible for the privacy practices of these third parties. We encourage you to review the privacy policies of any third-party services you access through our platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">11. Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our Services are not directed to children under the age of 13 (or 16 in the European Economic Area). We do not knowingly collect personal information from children. If we learn that we have collected personal information from a child without parental consent, we will take steps to delete that information promptly. If you believe a child has provided us with personal information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">12. International Data Transfers</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that differ from your jurisdiction. We take appropriate safeguards to ensure your information is protected in accordance with this Privacy Policy, including the use of standard contractual clauses or other approved transfer mechanisms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">13. California Privacy Rights (CCPA)</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information we collect, the right to delete your personal information, the right to opt out of the sale of personal information (we do not sell personal information), and the right to non-discrimination for exercising your privacy rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">14. Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of material changes by posting the updated policy on our website with a revised "Last updated" date. Your continued use of our Services after any changes indicates your acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">15. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
            </p>
            <div className="mt-3 text-muted-foreground">
              <p className="font-medium text-foreground">FIO Creatives — Privacy Team</p>
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
