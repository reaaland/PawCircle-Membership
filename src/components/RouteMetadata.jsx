import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const defaultMetadata = {
  title: "PawCircle Membership | Portfolio Demo",
  description:
    "Explore PawCircle Membership, a portfolio demonstration of a local pet-care connection platform designed and built by PawCircle LLC.",
};

const metadataByPath = {
  "/": {
    title: "PawCircle Membership | Product Portfolio",
    description:
      "See how PawCircle Membership went from idea to launch and explore the full-stack product work behind the original pet-care platform.",
  },
  "/membership": {
    title: "PawCircle Product Overview | Portfolio Demo",
    description:
      "Explore the original PawCircle product concept, role-based experiences, and portfolio-safe demo views for pet owners and providers.",
  },
  "/demo": {
    title: "PawCircle Interactive Product Demo",
    description:
      "Explore fictional pet-owner and provider experiences in the PawCircle interactive portfolio demo. No accounts, payments, or real messages are created.",
  },
  "/case-study": {
    title: "PawCircle Membership Case Study | Rebecca Aaland",
    description:
      "Read the PawCircle Membership case study covering the product problem, full-stack build, launch, business outcome, and lessons learned.",
  },
  "/about": {
    title: "About PawCircle Membership | Portfolio Project",
    description:
      "Learn about PawCircle Membership, the original product idea, and the development work behind this interactive portfolio project.",
  },
  "/contact": {
    title: "Contact | PawCircle Membership Portfolio",
    description:
      "Contact Rebecca Aaland about the PawCircle Membership portfolio project or website work for service businesses.",
  },
  "/services": {
    title: "PawCircle Service Concept | Portfolio Demo",
    description:
      "Review the pet-care service categories represented in the original PawCircle Membership product concept.",
  },
  "/for-providers": {
    title: "PawCircle Provider Experience | Portfolio Demo",
    description:
      "Explore how PawCircle Membership was designed to help independent pet-care providers present services and connect with local pet owners.",
  },
  "/join": {
    title: "Choose a PawCircle Demo View",
    description:
      "Choose a fictional pet-owner, provider, or combined account perspective to explore the PawCircle portfolio demo.",
  },
};

function RouteMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    const metadata = metadataByPath[pathname] ?? defaultMetadata;
    document.title = metadata.title;

    let descriptionTag = document.querySelector('meta[name="description"]');

    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.setAttribute("name", "description");
      document.head.appendChild(descriptionTag);
    }

    descriptionTag.setAttribute("content", metadata.description);
  }, [pathname]);

  return null;
}

export default RouteMetadata;
