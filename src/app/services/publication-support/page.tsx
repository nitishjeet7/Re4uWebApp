import type { Metadata } from "next";
import { PublicationSupportPage } from "./PublicationSupportPage";

export const metadata: Metadata = {
  title: "Publication Support | Researchedit4u",
  description:
    "Journal shortlist, submission-ready pack, and integrity-first publication support for researchers.",
};

export default function PublicationSupportRoute() {
  return <PublicationSupportPage />;
}
