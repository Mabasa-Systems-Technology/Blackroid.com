import Image from "next/image";
import { ButtonLink } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import hands from "../../../public/images/cta-hands.webp";

/** The landing page's closing call to action: one clear button, beside a photo of work about to start. */
export function HomeCta() {
  return (
    <section className="bg-navy-950 py-20 text-white lg:py-28">
      <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7">
          <h2 className="max-w-2xl text-headline font-light text-balance">Ready to hand over the work?</h2>
          <p className="mt-6 max-w-xl text-lg text-white/75">
            Tell us the challenge. We will tell you the next step. No obligation.
          </p>
          <div className="mt-10">
            <ButtonLink href="/contact" variant="light">
              Discuss Your Business Challenge
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
          <div className="relative mx-auto aspect-[2/3] w-full max-w-xs overflow-hidden rounded-[4px] rounded-tr-[56px] bg-navy-900 lg:max-w-none">
            <Image
              src={hands}
              alt="Hands typing on a laptop"
              fill
              sizes="(min-width: 1024px) 30vw, 320px"
              placeholder="blur"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
