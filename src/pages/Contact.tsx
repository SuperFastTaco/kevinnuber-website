import React from 'react';
import { Mail, Phone, ExternalLink, Download, User } from 'lucide-react';
import { motion } from 'motion/react';

export default function Contact() {
  const teamMembers = [
    {
      name: "Kevin Nuber",
      role: "Sr. Advisor Development Consultant",
      email: "kevin.nuber@simplicitygroup.com",
      phone: "Direct: 619.625.6211",
      image: "/pictures/kevin-headshot.jpg"
    },
    {
      name: "Michael Clementi",
      role: "Advisor Development Consultant",
      email: "michael.clementi@simplicitygroup.com",
      phone: "Office: 888-543-3776, ext. 3282",
      image: "/pictures/Michael_Clementi.png"
    },
    {
      name: "Hank Kuonen",
      role: "Advisor Development Consultant",
      email: "hank.kuonen@simplicitygroup.com",
      phone: "Direct: 501.227.6653",
      image: "/pictures/Hank_Kuonen.png"
    },
    {
      name: "Ron Riccio",
      role: "Advisor Development Consultant",
      email: "ron.riccio@simplicitygroup.com",
      phone: "Direct: 602.385.2390",
      image: "/pictures/Ron_Riccio.jpg"
    },
    {
      name: "Jill Ford",
      role: "Senior Sales Associate",
      email: "jill.ford@simplicitygroup.com",
      phone: "Direct: 602.385.2392",
      image: "/pictures/Jill_Ford.png"
    },
    {
      name: "Jeremy Peterson",
      role: "Relationship Manager",
      email: "jeremy.peterson@simplicitygroup.com",
      phone: "Direct: 480.718.3130 | Office: 877.488.3361",
      image: "/pictures/Jeremy_Peterson.png"
    }
  ];

  const supportSections = [
    {
      title: "Contracting Departments",
      contacts: [
        {
          name: "Life Contracting",
          email: "life.contracting@simplicitygroup.com",
          phone: "900-921-3100"
        },
        {
          name: "Annuity Contracting",
          email: "annuity.contracting@simplicitygroup.com",
          phone: "800-201-0224, opt. 4"
        }
      ]
    },
    {
      title: "New Business Contacts",
      contacts: [
        {
          name: "Liz Tisdale",
          role: "Life New Business",
          email: "liz.tisdale@simplicitygroup.com",
          phone: "763-200-7956"
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
            Your Dedicated Team
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Primary relationship contacts and advisor support for our partners.
          </p>
          <div className="mt-6">
            <a 
              href="/downloads/Simplicity_Team_Contact_Sheet_2026_kevin.pdf" 
              download="Simplicity_Team_Contact_Sheet_2026_kevin.pdf"
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
            
            {/* Primary Team Flow */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-serif font-semibold text-brand-blue border-b border-gray-200 pb-4">
                Primary Contacts
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {teamMembers.map((member, idx) => (
                  <motion.div 
                    key={member.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="bg-white rounded-2xl shadow-sm border border-brand-blue/10 overflow-hidden flex flex-col"
                  >
                    <div className="p-6 flex flex-col items-center text-center">
                      <div className="relative mb-4">
                        <div className="h-28 w-28 rounded-full overflow-hidden border-4 border-brand-light shadow-inner flex items-center justify-center bg-gray-50">
                          {member.image ? (
                            <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                          ) : (
                            <User className="h-10 w-10 text-gray-300" />
                          )}
                        </div>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 leading-tight">{member.name}</h4>
                      <p className="text-sm font-medium text-brand-accent mt-1 mb-4">{member.role}</p>
                      
                      <div className="w-full flex-1 flex flex-col justify-end space-y-3 mt-4 pt-4 border-t border-gray-100">
                        <a href={`mailto:${member.email}`} className="group flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-brand-accent transition-colors w-full bg-slate-50 py-2 rounded-lg border border-gray-100">
                          <Mail className="h-4 w-4 text-gray-400 group-hover:text-brand-accent transition-colors" />
                          <span className="truncate">{member.email}</span>
                        </a>
                        <div className="flex flex-col gap-1 items-center">
                          {member.phone.split(' | ').map((num, i) => (
                            <span key={i} className="flex items-center gap-2 text-sm text-gray-600">
                              <Phone className="h-3 w-3 text-gray-400" />
                              {num}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Support Departments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-6 pt-6"
            >
              <h3 className="text-2xl font-serif font-semibold text-brand-blue border-b border-gray-200 pb-4">
                Support Contacts & Resources
              </h3>
              
              <div className="space-y-8">
                {supportSections.map((section, idx) => (
                  <div key={section.title} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-slate-50 border-b border-gray-200 px-6 py-4">
                      <h3 className="text-lg font-serif font-semibold text-brand-blue">{section.title}</h3>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {section.contacts.map((contact) => (
                        <div key={contact.name} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <h4 className="text-base font-bold text-gray-900">{contact.name}</h4>
                            {contact.role && <p className="text-sm font-medium text-gray-500 mb-2 sm:mb-0">{contact.role}</p>}
                          </div>
                          <div className="flex flex-col space-y-2 sm:items-end flex-shrink-0">
                            <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-brand-accent transition-colors">
                              <Mail className="h-4 w-4" />
                              <span className="break-all">{contact.email}</span>
                            </a>
                            <a href={`tel:${contact.phone.split(',')[0].replace(/[^0-9]/g, '')}`} className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-brand-accent transition-colors">
                              <Phone className="h-4 w-4" />
                              {contact.phone}
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

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
                        <span className="text-xs text-brand-light/70 truncate">{link.url}</span>
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
