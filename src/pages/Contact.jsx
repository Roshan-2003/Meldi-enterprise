import { Clock, Mail, MapPin, Phone } from "lucide-react";

import InquiryForm from "../components/InquiryForm";

const Contact = () => {
  const contactCards = [
    {
      icon: Phone,
      title: "Phone / Sales Desk",
      value: "+91 98765 43210",
      sub: "Mon – Sat, 9:30 AM to 6:30 PM IST",
    },
    {
      icon: Mail,
      title: "Email Inquiries",
      value: "sales@industrialmart.in",
      sub: "Quick quotation turnaround within 24 hrs",
    },
    {
      icon: MapPin,
      title: "Office & Warehouse",
      value: "GIDC Industrial Estate, Ahmedabad",
      sub: "Gujarat 382445, India",
    },
    {
      icon: Clock,
      title: "Dispatch & Support",
      value: "Pan-India Industrial Delivery",
      sub: "Custom sizes & bulk dispatch available",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 pb-16 md:pb-20">
      {/* Header */}
      <section className="bg-slate-900 py-12 text-white md:py-14">
        <div className="page-container">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400">
            Get a Quotation
          </p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            Contact Us &amp; Generate Inquiry
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
            Share your engineering material requirements, quantities, and technical
            specifications to generate an instant inquiry reference slip.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="page-container pt-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column: Contact Info */}
          <div className="space-y-4">
            {contactCards.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      {item.title}
                    </p>
                    <h2 className="mt-1 text-sm font-bold text-slate-900">
                      {item.value}
                    </h2>
                    <p className="mt-0.5 text-xs text-gray-500">{item.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Inquiry Generator Form */}
          <div className="lg:col-span-2">
            <InquiryForm
              title="Send Your Requirement / Generate Inquiry"
              subtitle="Complete the form to generate a tracked RFQ inquiry reference for our sales engineering team."
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
