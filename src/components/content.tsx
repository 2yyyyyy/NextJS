import Linkify from "linkify-react";
import { IntermediateRepresentation } from "linkifyjs";
import Link from "next/link";
import { getBaseUrl } from "@/utils/url";

type ContentProps = {
  children: React.ReactNode;
};

const renderLink = ({ attributes, content }: IntermediateRepresentation) => {
  const { href, ...props } = attributes;

  const isInternal = href.includes(getBaseUrl());

  const url = isInternal ? href.replace(getBaseUrl(), "") : href;

  const handleClick = (event: React.SyntheticEvent) => {
    if (isInternal) {
      return;
    }
    if (!confirm("Are you sure you want to leave this site?")) {
      event.preventDefault();
    }
  };

  let maybeContent = content;
  if (url.startsWith("/tickets/")) {
    maybeContent = url.replace("/tickets/", "Ticket #");
  }

  return (
    <Link href={url} {...props} className="underline" onClick={handleClick}>
      {maybeContent}
    </Link>
  );
};

const Content = ({ children }: ContentProps) => {
  return (
    <Linkify
      as="p"
      className="whitespace-pre-line"
      options={{ render: renderLink }}
    >
      {children}
    </Linkify>
  );
};

export { Content };
