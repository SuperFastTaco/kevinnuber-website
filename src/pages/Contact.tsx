import React from 'react';
import { Mail, Phone, ExternalLink, Download } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contact() {
  const sections = [
    {
      title: "Senior Advisor Development Consultants",
      contacts: [
        {
          name: "Kevin Nuber",
          role: "Advisor Development Consultant",
          email: "kevin.nuber@simplicitygroup.com",
          phone: "888-543-3776, ext. 3292"
        },
        {
          name: "Michael Clementi",
          role: "Advisor Development Consultant",
          email: "michael.clementi@simplicitygroup.com",
          phone: "888-543-3776, ext. 3282"
        }
      ]
    },
    {
      title: "Contracting Departments",
      contacts: [
        {
          name: "Life Contracting",
          role: "Department",
          email: "life.contracting@simplicitygroup.com",
          phone: "800-921-3100"
        },
        {
          name: "Annuity Contracting",
          role: "Department",
          email: "annuity.contracting@simplicitygroup.com",
          phone: "800-201-0224, opt. 4"
        }
      ]
    },
    {
      title: "New Business Contacts",
      contacts: [
        {
          name: "Amanda Browning",
          role: "Life New Business",
          email: "amanda.browning@simplicitygroup.com",
          phone: "888-543-3776, ext. 3284"
        },
        {
          name: "Megan Falcon",
          role: "Annuity New Business",
          email: "megan.falcon@simplicitygroup.com",
          phone: "800-752-0207, ext. 8555"
        }
      ]
    },
    {
      title: "Case Design & Proposal Support",
      contacts: [
        {
          name: "Life & Annuity Case Design / Proposal Support",
          role: "Department",
          email: "sd.casedesigners@simplicitygroup.com",
          phone: "888-542-3776"
        }
      ]
    },
    {
      title: "Marketing Support",
      contacts: [
        {
          name: "Molly McCabe",
          role: "Marketing Support",
          email: "molly.mccabe@simplicitygroup.com",
          phone: "480-482-3964"
        },
        {
          name: "Dawson Coe",
          role: "Marketing Support",
          email: "dawson.coe@simplicitygroup.com",
          phone: "480-877-1306"
        },
        {
          name: "Sarah Schrempf",
          role: "Marketing Support",
          email: "sarah.schrempf@simplicitygroup.com",
          phone: "860-501-1131"
        }
      ]
    }
  ];

  const links = [
    {
      name: "Simplicity Agent Center",
      url: "https://www.simplicityagentcenter.com/login"
    },
    {
      name: "Simplicity LifeLink",
      url: "https://lifelink.simplicitygroup.com/agent/nuber-11229/invite"
    },
    {
      name: "Tax-Free Retirement",
      url: "https://tfrsimplicity.com/"
    },
    {
      name: "NIW Kai-Zen Myilia",
      url: "https://www.myilia.com/"
    }
  ];

  return (
    <div className="bg-brand-light min-h-screen py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-brand-accent font-semibold tracking-wide uppercase text-sm mb-2">Simplicity Group</h2>
          <h1 className="text-4xl font-serif font-bold tracking-tight text-brand-blue sm:text-5xl">
            Advisor Support Contacts
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Your Dedicated Team. Key contacts and resources for Kevin Nuber and Michael Clementi.
          </p>
          <div className="mt-6">
            <a 
              href="/downloads/Simplicity_Team_Contact_Sheet_2026.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue hover:text-brand-accent transition-colors bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200"
            >
              <Download className="h-4 w-4" />
              Download PDF Version
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-12">
            {sections.map((section, idx) => (
              <motion.div 
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="bg-slate-50 border-b border-gray-200 px-6 py-4">
                  <h3 className="text-xl font-serif font-semibold text-brand-blue">{section.title}</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {section.contacts.map((contact) => (
                    <div key={contact.name} className="px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">{contact.name}</h4>
                        <p className="text-sm font-medium text-gray-500 mb-2 sm:mb-0">{contact.role}</p>
                      </div>
                      <div className="flex flex-col space-y-2 sm:items-end">
                        <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-brand-accent transition-colors">
                          <Mail className="h-4 w-4" />
                          {contact.email}
                        </a>
                        <a href={`tel:${contact.phone.split(',')[0].replace(/[^0-9]/g, '')}`} className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-brand-accent transition-colors">
                          <Phone className="h-4 w-4" />
                          {contact.phone}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-brand-blue rounded-2xl shadow-xl border border-brand-blue overflow-hidden sticky top-32"
            >
              <div className="px-6 py-8">
                <h3 className="text-xl font-serif font-semibold text-white mb-6">Important Simplicity Links</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a 
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex flex-col p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10"
                      >
                        <span className="flex items-center gap-2 text-white font-medium mb-1">
                          {link.name}
                          <ExternalLink className="h-3 w-3 text-brand-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </span>
                        <span className="text-xs text-gray-400 truncate">{link.url}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
