import React from 'react';
import { H1, H2 } from '@/shared/ui/headings';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
    revalidate: 86400,
  };
};

const Page = async () => {
  return (
    <section>
      <article>
        <div className='container'>
          <H1>Privacy Policy for Anitalks</H1>
          <p>
            <strong>Effective Date:</strong> [Insert Date]
          </p>

          <p>
            At <strong>Anitalks</strong>, we value and respect your privacy. This Privacy Policy
            explains how we collect, use, and protect your personal information when you visit and
            use our website and services.
          </p>

          <H2>1. Information We Collect</H2>
          <p>
            We may collect the following types of information when you use our website or services:
          </p>
          <ul>
            <li>
              <strong>Personal Information:</strong> This may include your name, email address,
              username, profile information, and any other information you provide when registering
              or interacting with our site.
            </li>
            <li>
              <strong>Usage Data:</strong> This includes information about how you access and use
              our services, such as IP addresses, browser types, device information, and activity on
              the website.
            </li>
            <li>
              <strong>Cookies and Tracking Technologies:</strong> We may use cookies, web beacons,
              and similar technologies to enhance user experience, analyze site traffic, and deliver
              personalized content and advertisements.
            </li>
          </ul>

          <H2>2. How We Use Your Information</H2>
          <p>We use the information we collect for the following purposes:</p>
          <ul>
            <li>To provide, operate, and maintain our services.</li>
            <li>To improve, personalize, and enhance your experience on our platform.</li>
            <li>
              To communicate with you, including sending updates, newsletters, and promotions
              related to Anitalks.
            </li>
            <li>To analyze and monitor website usage and performance.</li>
            <li>To respond to inquiries, provide customer support, and resolve issues.</li>
            <li>To prevent fraud, abuse, and security threats.</li>
          </ul>

          <H2>3. Data Sharing and Disclosure</H2>
          <p>
            We do not sell, trade, or rent your personal information to third parties. However, we
            may share your information in the following circumstances:
          </p>
          <ul>
            <li>
              <strong>With Service Providers:</strong> We may share your data with trusted
              third-party service providers who assist us in operating our platform or delivering
              services, subject to confidentiality agreements.
            </li>
            <li>
              <strong>Legal Compliance:</strong> We may disclose your information if required by law
              or to protect our rights, safety, or property, as well as those of our users.
            </li>
          </ul>

          <H2>4. Data Security</H2>
          <p>
            We implement a variety of security measures to protect your personal information.
            However, please be aware that no method of transmitting or storing data over the
            internet is 100% secure. While we strive to protect your personal information, we cannot
            guarantee its absolute security.
          </p>

          <H2>5. Your Data Protection Rights</H2>
          <p>
            You have certain rights regarding your personal information, including the right to:
          </p>
          <ul>
            <li>
              <strong>Access:</strong> Request a copy of your personal data.
            </li>
            <li>
              <strong>Rectification:</strong> Correct any inaccuracies in your personal information.
            </li>
            <li>
              <strong>Deletion:</strong> Request the deletion of your personal data, subject to
              applicable law.
            </li>
            <li>
              <strong>Restriction of Processing:</strong> Limit the processing of your personal data
              in certain situations.
            </li>
            <li>
              <strong>Object to Processing:</strong> Object to the processing of your personal data
              for direct marketing purposes.
            </li>
          </ul>
          <p>To exercise these rights, please contact us at [Insert Contact Email].</p>

          <H2>6. Third-Party Links</H2>
          <p>
            Our website may contain links to third-party websites, services, or content. These
            third-party sites have their own privacy policies, and we are not responsible for their
            content or privacy practices. Please review their policies before providing any personal
            information to them.
          </p>

          <H2>7. Children’s Privacy</H2>
          <p>
            Anitalks is not intended for children under the age of 13. We do not knowingly collect
            personal information from children. If we learn that we have collected personal
            information from a child under 13, we will take steps to delete that information.
          </p>

          <H2>8. Changes to This Privacy Policy</H2>
          <p>
            We reserve the right to update or modify this Privacy Policy at any time. Any changes
            will be posted on this page, and the effective date will be updated accordingly. Please
            check this page periodically to stay informed about our privacy practices.
          </p>

          <H2>9. Contact Us</H2>
          <p>
            If you have any questions or concerns about this Privacy Policy or our data practices,
            please contact us at:
          </p>
          <ul>
            <li>
              <strong>Email:</strong> support@anitalks.com
            </li>
            <li>
              <strong>Address:</strong> Man island, UNITED KINGDOM(UK)
            </li>
            <li>
              <strong>Phone:</strong>(+1) 284 224 231
            </li>
          </ul>
        </div>
      </article>
    </section>
  );
};

export default Page;
