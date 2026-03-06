import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema } from "@shared/schema";
import type { InsertContactMessage, ContactInfo } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function ContactSection() {
  const { toast } = useToast();
  const { data: info } = useQuery<ContactInfo>({ queryKey: ["/api/contact-info"] });

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(
      insertContactMessageSchema.extend({
        name: insertContactMessageSchema.shape.name.min(2, "Name is required"),
        email: insertContactMessageSchema.shape.email.email("Valid email is required"),
        message: insertContactMessageSchema.shape.message.min(10, "Please provide more details"),
      })
    ),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      service: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertContactMessage) => {
    const toEmail = info?.email || "info@fiocreatives.com";
    const subject = encodeURIComponent(
      `New Project Inquiry from ${data.name}${data.company ? ` (${data.company})` : ""}`
    );
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}${data.company ? `\nCompany: ${data.company}` : ""}${data.service ? `\nService: ${data.service}` : ""}\n\nMessage:\n${data.message}`
    );
    window.location.href = `mailto:${toEmail}?subject=${subject}&body=${body}`;
    toast({
      title: "Opening email client...",
      description: "Your email app should open with the message ready to send.",
    });
  };

  const contactDetails = [
    {
      icon: Mail,
      label: "Email Us",
      value: info?.email || "info@fiocreatives.com",
      href: `mailto:${info?.email || "info@fiocreatives.com"}`,
    },
    {
      icon: Phone,
      label: "Call Us",
      value: info?.phone || "+1 (555) 123-4567",
      href: `tel:${(info?.phone || "+1 (555) 123-4567").replace(/[^+\d]/g, "")}`,
    },
    {
      icon: MapPin,
      label: "Address",
      value: info?.address || "123 Innovation Drive, San Francisco, CA",
      href: "#",
    },
  ];

  return (
    <section
      id="contact"
      className="py-16 md:py-24 lg:py-32 relative overflow-hidden"
      data-testid="section-contact"
    >
      <div className="absolute inset-0 bg-muted/30" />
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-semibold text-primary tracking-wide uppercase">
            {info?.sectionLabel || "Get in Touch"}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            {info?.sectionTitle || "Let's Build Something Great"}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {info?.sectionSubtitle || "Ready to start your next project? Drop us a message and we'll get back to you within 24 hours."}
          </p>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-chart-2" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 md:gap-8">
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative rounded-xl p-[1px] bg-gradient-to-br from-primary/30 via-transparent to-chart-2/30">
              <Card className="p-6 lg:p-8 border-0 bg-card/80 backdrop-blur-sm rounded-xl">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5"
                    data-testid="form-contact"
                  >
                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="John Doe"
                                className="rounded-xl focus:ring-2 focus:ring-primary/20"
                                {...field}
                                data-testid="input-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="john@example.com"
                                className="rounded-xl focus:ring-2 focus:ring-primary/20"
                                {...field}
                                data-testid="input-email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company (Optional)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your Company"
                                className="rounded-xl focus:ring-2 focus:ring-primary/20"
                                {...field}
                                value={field.value || ""}
                                data-testid="input-company"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="service"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service Interested In</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value || ""}
                            >
                              <FormControl>
                                <SelectTrigger data-testid="select-service" className="rounded-xl focus:ring-2 focus:ring-primary/20">
                                  <SelectValue placeholder="Select a service" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="web">Web Development</SelectItem>
                                <SelectItem value="mobile">Mobile Development</SelectItem>
                                <SelectItem value="design">UI/UX Design</SelectItem>
                                <SelectItem value="strategy">Digital Strategy</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tell Us About Your Project</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe your project, goals, timeline, and budget range..."
                              className="min-h-[120px] resize-none rounded-xl focus:ring-2 focus:ring-primary/20"
                              {...field}
                              data-testid="input-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full sm:w-auto bg-gradient-to-r from-primary to-chart-2 border-0 text-primary-foreground"
                      data-testid="button-submit-contact"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </Form>
              </Card>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-2 space-y-4 md:space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {contactDetails.map((detail, index) => (
              <motion.a
                key={detail.label}
                href={detail.href}
                className="block"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                data-testid={`link-contact-${detail.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <Card className="p-4 md:p-5 border-border/50 bg-card/80 backdrop-blur-sm hover-elevate transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center flex-shrink-0">
                      <detail.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-muted-foreground mb-0.5">
                        {detail.label}
                      </div>
                      <div className="font-medium text-foreground truncate">
                        {detail.value}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
