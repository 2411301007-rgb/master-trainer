import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant w-full py-xl px-margin-mobile flex flex-col items-center text-center gap-gutter mt-auto">
      <h2 className="font-headline-md text-headline-md text-on-surface mb-md tracking-widest text-[20px]">MASTER TRAINER</h2>
      <ul className="flex flex-wrap justify-center gap-md mb-md">
        <li>
          <Link to="/exercises" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">
            Exercises
          </Link>
        </li>
        <li>
          <a href="#programs" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">
            Programs
          </a>
        </li>
        <li>
          <a href="#nutrition" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">
            Nutrition
          </a>
        </li>
        <li>
          <a href="#knowledge" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">
            Knowledge
          </a>
        </li>
        <li>
          <a href="#disclaimer" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">
            Safety Disclaimer
          </a>
        </li>
        <li>
          <a href="#privacy" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">
            Privacy Policy
          </a>
        </li>
      </ul>
      <p className="font-body-md text-body-md text-on-surface-variant text-sm">
        © 2024 Master Trainer Elite Athlete Development. All rights reserved.
      </p>
    </footer>
  );
}
