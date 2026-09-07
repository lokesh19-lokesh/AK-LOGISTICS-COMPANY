# AK Logistics Company — Corporate Website

A complete, production-ready, multi-page website for **AK Logistics Company**, a premier Third-Party Logistics (3PL) and supply chain solutions provider based in Riyadh, Kingdom of Saudi Arabia.

Built strictly using **HTML5, CSS3, Vanilla JavaScript, and Bootstrap 5.3.3 / Bootstrap Icons 1.11.3**.

---

## 1. Company Profile

* **Company Name:** AK Logistics Company
* **Business Type:** Third-Party Logistics (3PL) and Supply Chain Solutions Provider
* **Headquarters:** Riyadh, Kingdom of Saudi Arabia
* **Proprietor / Leadership:** Mohammed Ahsan Khan
* **Contact Phone:** +966 550 208 079
* **WhatsApp Direct:** https://wa.me/966550208079

### Mission
To be a trusted logistics partner by delivering innovative, reliable, and customer-centric 3PL solutions that connect businesses, optimize supply chains, and drive sustainable growth.

### Vision
To become the most trusted and innovative 3PL logistics partner, delivering seamless supply chain solutions through excellence, technology, and customer satisfaction.

### Core Values
Integrity, Customer First, Reliability, Excellence, Innovation, Teamwork, Safety, Accountability, Sustainability, and Continuous Improvement.

---

## 2. Website Structure & Pages (20 Pages)

```text
ak-logistics/
│
├── index.html                   # 1. Home
├── about.html                   # 2. About Us
├── services.html                # 3. All Services Directory
├── transportation.html          # 4. Transportation & Freight Management
├── warehousing.html             # 5. Warehousing & Storage
├── inventory-management.html    # 6. Inventory Management
├── distribution.html            # 7. Distribution & Last-Mile Delivery
├── order-fulfillment.html       # 8. Order Fulfillment
├── supply-chain.html            # 9. Supply Chain Management
├── reverse-logistics.html       # 10. Reverse Logistics
├── logistics-consulting.html    # 11. Logistics Consulting
├── value-added-services.html    # 12. Value-Added Services
├── technology-logistics.html    # 13. Technology-Driven Logistics
├── industries.html              # 14. Industries We Serve (8 Sectors)
├── why-choose-us.html           # 15. Why Choose Us (10 Operational Pillars)
├── contact.html                 # 16. Contact Us & Riyadh Operational Map
├── get-a-quote.html             # 17. Get a Quote (Lead Generation Form)
├── privacy-policy.html          # 18. Privacy Policy (Saudi PDPL Compliant)
├── terms-conditions.html        # 19. Terms & Conditions of Service
├── thank-you.html               # 20. Thank You (Conversion Event Trigger)
│
├── assets/
│   ├── css/
│   │   └── style.css            # Master corporate design system & responsive rules
│   ├── js/
│   │   └── main.js              # Navbar behavior, form validation, conversion hooks
│   └── images/
│       ├── logo.svg             # Official AK Logistics brand mark
│       ├── favicon.svg          # Matching crisp brand favicon
│       ├── hero-logistics.svg   # 3PL hero transport & hub illustration
│       ├── truck-fleet.svg      # Freight transport illustration
│       ├── warehouse-interior.svg # Warehousing & storage illustration
│       ├── inventory-tech.svg   # Inventory & barcode scanning illustration
│       ├── last-mile.svg        # Distribution delivery van illustration
│       ├── order-fulfillment.svg # Conveyor fulfillment illustration
│       ├── supply-chain.svg     # End-to-end supply chain diagram
│       ├── reverse-logistics.svg # Circular returns cycle illustration
│       ├── consulting-logistics.svg # Facility blueprint optimization illustration
│       ├── value-added.svg      # Value-added services illustration
│       ├── tech-dashboard.svg   # Fleet TMS telematics interface
│       └── riyadh-map.svg       # Riyadh hub & Kingdom coverage vector
│
└── README.md
```

---

## 3. Google Ads & SEO Optimization

### Search Engine Optimization (SEO)
* **Unique Metadata:** Every page features a unique, keyword-tailored `<title>` and `<meta name="description">`.
* **Canonical URLs:** Configured canonical links on each page.
* **Heading Hierarchy:** Strictly one semantic `<h1>` per page, followed by logical `<h2>` and `<h3>` tags.
* **Image Accessibility:** All SVG assets and images include descriptive `alt` text.

### Google Ads Landing Page Features
* **High Conversion Flow:** Visible Call-to-Action buttons above the fold on all service pages.
* **Lead Capture:** Quotation inquiries (`get-a-quote.html` and service landing pages) redirect to `thank-you.html`.
* **Conversion Tracking Placeholders:** Clearly marked Google Ads conversion tracking code snippets inside `<head>` and `thank-you.html`.
* **Google Tag Manager & GA4 Placeholders:** Commented templates ready for active IDs.

---

## 4. How to Run Locally

You can preview the website by launching any local static HTTP server.

Using Python:
```bash
cd ak-logistics
python3 -m http.server 8080
```

Or using Node (`npx serve`):
```bash
npx -y serve ak-logistics -p 8080
```

Then open `http://localhost:8080` in your web browser.
