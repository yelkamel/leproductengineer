import { Inter, JetBrains_Mono, Kanit, Shantell_Sans } from "next/font/google";

/* Les quatre voix du thème (voir packages/ui/theme.css). */
const kanit = Kanit({ variable: "--font-kanit", subsets: ["latin"], weight: ["700", "800", "900"], style: ["italic"] });
const shantell = Shantell_Sans({ variable: "--font-shantell", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

export const fontVariables = [kanit, shantell, inter, jetbrains].map((f) => f.variable).join(" ");
