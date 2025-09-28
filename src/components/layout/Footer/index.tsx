import Image from 'next/image';
import Link from 'next/link';

import facebookIcon from '~/../public/icons/facebook_icon.png';
import instagramIcon from '~/../public/icons/instagram_icon.png';
import emailIcon from '~/../public/icons/email_icon.png';
import youtubeIcon from '~/../public/icons/youtube_icon.png';

import LinkWithUnderline from '~/components/LinkWithUnderline';

const sectionLinks = ['', 'villas', 'experience', 'yoga', 'retreats'];

const Footer = () => {
  return (
    <section className="flex justify-center flex-wrap p-8 bg-purple w-full text-white gap-16">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <Link
            href="https://maps.app.goo.gl/E72yT9VCsW2KYY1Z9"
            rel="noopener noreferrer"
            target="_blank"
          >
            <p>Masakali</p>
            <p>Br. Ayah Kelusa Payangan</p>
            <p>Gianyar Bali 80572</p>
            <p className="font-montserrat">+62 823-4646-2331</p>
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link
          href="https://www.instagram.com/masakaliretreat"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Image
            src={instagramIcon}
            alt="instagram"
            className="w-6 h-6"
          />
        </Link>

        <Link
          href="https://www.facebook.com/masakaliretreat"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Image
            src={facebookIcon}
            alt="facebook"
            className="w-6 h-6"
          />
        </Link>
        <Link
          href="https://www.youtube.com/channel/UCh3H51A2SUTii6pnWwKhsgQ"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Image
            src={youtubeIcon}
            alt="youtube"
            className="w-6 h-6"
          />
        </Link>

        <Link
          href="mailto: info@masakaliretreat.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Image
            src={emailIcon}
            alt="email"
            className="w-6 h-6"
          />
        </Link>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-4 font-montserrat uppercase text-sm">
        {sectionLinks.map((link) => (
          <LinkWithUnderline
            key={link + '-' + 'footer'}
            href={`/${link}`}
          >
            {link}
          </LinkWithUnderline>
        ))}
      </div>
    </section>
  );
};

export default Footer;
