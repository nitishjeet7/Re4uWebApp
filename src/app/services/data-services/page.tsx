import type { Metadata } from "next";
import DataServicesExperience from "./DataServicesExperience";

export const metadata: Metadata = {
  title: "Data Services | Researchedit4u",
  description:
    "Data services for thesis, surveys, and clinical/public-health research with transparent methodology pathways and QC-backed outputs.",
};

export default function DataServicesPage() {
  return <DataServicesExperience fontClassName="" />;
}
