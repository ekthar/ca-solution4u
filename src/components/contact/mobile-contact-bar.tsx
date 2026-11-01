import { Mail, MessageCircle, Phone } from "lucide-react";
import { links, whatsappLink } from "@/lib/constants";

/**
 * Persistent contact actions on small screens. The body carries matching
 * bottom padding (globals.css), so this bar never covers page content.
 */
export function MobileContactBar() {
  const item =
    "flex min-h-14 flex-1 flex-col items-center justify-center gap-1 text-[0.72rem] font-medium tracking-wide text-white/85 transition-colors active:bg-white/8";
  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-obsidian/88 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl backdrop-saturate-150 md:hidden"
    >
      <ul className="flex divide-x divide-white/8">
        <li className="flex flex-1">
          <a href={links.tel} className={item}>
            <Phone aria-hidden className="size-[18px]" strokeWidth={1.75} />
            Call
          </a>
        </li>
        <li className="flex flex-1">
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={item}>
            <MessageCircle aria-hidden className="size-[18px] text-blue" strokeWidth={1.75} />
            WhatsApp
          </a>
        </li>
        <li className="flex flex-1">
          <a href={links.mailto} className={item}>
            <Mail aria-hidden className="size-[18px]" strokeWidth={1.75} />
            Email
          </a>
        </li>
      </ul>
    </nav>
  );
}
