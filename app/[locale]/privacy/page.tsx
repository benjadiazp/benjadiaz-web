import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className={"mx-auto"}>
      <div className={"px-4 py-4"}>
        <h1 className={"text-2xl"}>Privacy</h1>
        <h2 className={"text-xl"}>Analytics</h2>
        <p>
          We partner with Microsoft Clarity and Microsoft Advertising to capture
          how you use and interact with our website through behavioral metrics,
          heatmaps, and session replay to improve and market our
          products/services. Website usage data is captured using first and
          third-party cookies and other tracking technologies to determine the
          popularity of products/services and online activity. Additionally, we
          use this information for site optimization, fraud/security purposes,
          and advertising. For more information about how Microsoft collects and
          uses your data, visit the Microsoft{" "}
          <Link
            href={"https://privacy.microsoft.com/privacystatement"}
            className={"text-blue-500 underline"}
          >
            Privacy Statement
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
