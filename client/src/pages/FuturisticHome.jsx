import React from 'react';
import DockNavbar from '../components/DockNavbar';
import AuroraBackground from '../components/AuroraBackground';
import TypingHeading from '../components/TypingHeading';
import StepperForm from '../components/StepperForm';
import GradientLogo from '../components/GradientLogo';

const FuturisticHome = () => {
  return (
    <div className="min-h-screen relative text-gray-900 dark:text-white">
      <AuroraBackground />
      <DockNavbar />

      <main className="pt-24">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <GradientLogo text="HelpingHands" className="text-5xl mb-6 block" />
              <TypingHeading texts={["Make a Real Impact", "Change a Life Today", "Join a Future of Giving"]} />
              <p className="mt-6 text-gray-700 dark:text-gray-300 max-w-xl">A clean, minimal, and futuristic UI to help donors find meaning and act quickly. Soft transitions, aurora background and subtle animations improve focus and clarity.</p>
            </div>

            <div>
              <StepperForm />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FuturisticHome;
