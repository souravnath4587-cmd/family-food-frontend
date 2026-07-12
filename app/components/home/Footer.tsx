import Link from "next/link";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

const SHOP_LINKS = [
  { href: "/products", label: "All Products" },
  { href: "/products?category=chanachur", label: "Chanachur" },
  { href: "/products?category=nimki", label: "Nimki" },
  { href: "/products?category=gift-box", label: "Gift Boxes" },
];

const COMPANY_LINKS = [
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Contact Us" },
  { href: "/faq", label: "FAQ" },
  { href: "/careers", label: "Careers" },
];

const LEGAL_LINKS = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/shipping-policy", label: "Shipping Policy" },
];

const SOCIAL_LINKS = [
  { href: "https://facebook.com", label: "Facebook", icon: FaFacebookF },
  { href: "https://instagram.com", label: "Instagram", icon: FaInstagram },
  { href: "https://wa.me/8801000000000", label: "WhatsApp", icon: FaWhatsapp },
  { href: "https://youtube.com", label: "YouTube", icon: FaYoutube },
];

export default function Footer() {
  return (
    <footer
      className="w-full border-t border-[#E4DCC8]"
      style={{ backgroundColor: "#20261F" }}
    >
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* brand + contact */}
          <div className="lg:col-span-2">
            <span
              className="text-xl text-[#FBF3E7]"
              style={{ fontFamily: "var(--font-fraunces)", fontWeight: 600 }}
            >
              familyFood
            </span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-[#B9C2BB]">
              Homemade Bengali spicy dry snacks, made fresh for families — a
              little spicy, a lot of love.
            </p>

            <ul className="mt-5 flex flex-col gap-2.5 text-sm text-[#B9C2BB]">
              <li className="flex items-center gap-2.5">
                <FiMapPin size={15} className="shrink-0 text-[#E3A73E]" />
                House 12, Road 5, Dhanmondi, Dhaka 1209
              </li>
              <li>
                <a
                  href="tel:+8801000000000"
                  className="flex items-center gap-2.5 hover:text-[#FBF3E7]"
                >
                  <FiPhone size={15} className="shrink-0 text-[#E3A73E]" />
                  +880 1000-000000
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@familyfood.com"
                  className="flex items-center gap-2.5 hover:text-[#FBF3E7]"
                >
                  <FiMail size={15} className="shrink-0 text-[#E3A73E]" />
                  hello@familyfood.com
                </a>
              </li>
            </ul>

            <div className="mt-5 flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FBF3E7]/10 text-[#FBF3E7] hover:bg-[#FBF3E7]/20"
                >
                  <social.icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Shop" links={SHOP_LINKS} />
          <FooterColumn title="Company" links={COMPANY_LINKS} />
          <FooterColumn title="Legal" links={LEGAL_LINKS} />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[#FBF3E7]/10 pt-6 text-xs text-[#8A9088] sm:flex-row">
          <p>© {new Date().getFullYear()} FamilyFood. All rights reserved.</p>
          <p>Made with care in Dhaka, Bangladesh.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-wide text-[#FBF3E7]">
        {title}
      </h3>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-[#B9C2BB] hover:text-[#FBF3E7]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
