'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Mail,
    Phone,
    MessageCircle,
    Send,
    Building,
    Globe,
    Package,
    CheckCircle
} from 'lucide-react'

export default function ContactForBuyers() {
    const [formData, setFormData] = useState({
        companyName: '',
        country: '',
        email: '',
        phone: '',
        productInterest: '',
        orderQuantity: '',
        message: '',
        contactMethod: 'email',
    })

    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: Implement actual form submission
        console.log('Form submitted:', formData)
        setIsSubmitted(true)
        setTimeout(() => setIsSubmitted(false), 3000)
    }

    return (
        <section id="contact" className="section-spacing bg-white">
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center space-x-2 bg-terminel-green/10 text-terminel-green px-6 py-3 rounded-full mb-6">
                        <MessageCircle size={20} />
                        <span className="font-semibold">Get in Touch</span>
                    </div>
                    <h2 className="font-heading font-bold text-3xl lg:text-5xl text-terminel-green mb-4">
                        Contact International Sales
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Start your partnership with Grupo Terminel. Our export team is ready to assist you
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="card-glass p-8">
                            <h3 className="font-heading font-bold text-2xl text-gray-900 mb-6">
                                Request a Quote
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Company Name */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                                        Company Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.companyName}
                                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terminel-green focus:border-terminel-green"
                                        placeholder="Your company name"
                                    />
                                </div>

                                {/* Country */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                                        Country *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.country}
                                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terminel-green focus:border-terminel-green"
                                        placeholder="Your country"
                                    />
                                </div>

                                {/* Email & Phone */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terminel-green focus:border-terminel-green"
                                            placeholder="email@company.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 mb-2 block">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terminel-green focus:border-terminel-green"
                                            placeholder="+1 234 567 8900"
                                        />
                                    </div>
                                </div>

                                {/* Product Interest */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                                        Product of Interest *
                                    </label>
                                    <select
                                        required
                                        value={formData.productInterest}
                                        onChange={(e) => setFormData({ ...formData, productInterest: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terminel-green focus:border-terminel-green"
                                    >
                                        <option value="">Select a product</option>
                                        <option value="white-corn">White Corn</option>
                                        <option value="chickpeas">Chickpeas</option>
                                        <option value="beans">Premium Beans</option>
                                        <option value="wheat">Selected Wheat</option>
                                        <option value="multiple">Multiple Products</option>
                                    </select>
                                </div>

                                {/* Order Quantity */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                                        Estimated Order Quantity (MT)
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.orderQuantity}
                                        onChange={(e) => setFormData({ ...formData, orderQuantity: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terminel-green focus:border-terminel-green"
                                        placeholder="e.g., 50 MT"
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                                        Additional Details
                                    </label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terminel-green focus:border-terminel-green resize-none"
                                        placeholder="Tell us about your requirements..."
                                    />
                                </div>

                                {/* Preferred Contact Method */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-3 block">
                                        Preferred Contact Method
                                    </label>
                                    <div className="flex flex-wrap gap-3">
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                value="email"
                                                checked={formData.contactMethod === 'email'}
                                                onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value })}
                                                className="text-terminel-green focus:ring-terminel-green"
                                            />
                                            <span className="text-sm">Email</span>
                                        </label>
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                value="phone"
                                                checked={formData.contactMethod === 'phone'}
                                                onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value })}
                                                className="text-terminel-green focus:ring-terminel-green"
                                            />
                                            <span className="text-sm">Phone</span>
                                        </label>
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                value="whatsapp"
                                                checked={formData.contactMethod === 'whatsapp'}
                                                onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value })}
                                                className="text-terminel-green focus:ring-terminel-green"
                                            />
                                            <span className="text-sm">WhatsApp</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitted}
                                    className={`w-full flex items-center justify-center space-x-2 font-bold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 ${isSubmitted
                                            ? 'bg-green-600 text-white'
                                            : 'bg-terminel-green hover:bg-terminel-green-700 text-white'
                                        }`}
                                >
                                    {isSubmitted ? (
                                        <>
                                            <CheckCircle size={18} />
                                            <span>Message Sent!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send size={18} />
                                            <span>Send Inquiry</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </motion.div>

                    {/* Right: Direct Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        {/* Quick Contact */}
                        <div className="card-glass p-8">
                            <h3 className="font-heading font-bold text-xl text-gray-900 mb-6">
                                Direct Contact
                            </h3>
                            <div className="space-y-4">
                                <a
                                    href="mailto:exports@grupoterminel.com"
                                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                                >
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                        <Mail size={20} className="text-white" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">Email</div>
                                        <div className="font-semibold text-gray-900">exports@grupoterminel.com</div>
                                    </div>
                                </a>

                                <a
                                    href="tel:+526871234567"
                                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                                >
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                        <Phone size={20} className="text-white" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">Phone</div>
                                        <div className="font-semibold text-gray-900">+52 (687) 123-4567</div>
                                    </div>
                                </a>

                                <a
                                    href="https://wa.me/526871234567"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                                >
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                                        <MessageCircle size={20} className="text-white" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">WhatsApp</div>
                                        <div className="font-semibold text-gray-900">Message Us</div>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Why Choose Us */}
                        <div className="card-glass p-8 bg-gradient-to-br from-terminel-green via-terminel-green-700 to-terminel-green-800 text-white">
                            <h3 className="font-heading font-bold text-xl mb-6">
                                Why Choose Grupo Terminel?
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start space-x-3">
                                    <CheckCircle size={20} className="text-harvest-gold flex-shrink-0 mt-0.5" />
                                    <span className="text-sm">ISO 22000:2018 certified quality management</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <CheckCircle size={20} className="text-harvest-gold flex-shrink-0 mt-0.5" />
                                    <span className="text-sm">55+ years of international export experience</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <CheckCircle size={20} className="text-harvest-gold flex-shrink-0 mt-0.5" />
                                    <span className="text-sm">Reliable supply chain and on-time delivery</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <CheckCircle size={20} className="text-harvest-gold flex-shrink-0 mt-0.5" />
                                    <span className="text-sm">Complete traceability and documentation support</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <CheckCircle size={20} className="text-harvest-gold flex-shrink-0 mt-0.5" />
                                    <span className="text-sm">Dedicated international sales team</span>
                                </li>
                            </ul>
                        </div>

                        {/* Business Hours */}
                        <div className="card-glass p-6">
                            <h4 className="font-semibold text-gray-900 mb-3">Business Hours (CST)</h4>
                            <div className="text-sm text-gray-600 space-y-1">
                                <div>Monday - Friday: 8:00 AM - 6:00 PM</div>
                                <div>Saturday: 8:00 AM - 2:00 PM</div>
                                <div className="text-gray-500">Sunday: Closed</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
