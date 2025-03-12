import Image from 'next/image';

const Logo = () => (
  <div>
    <Image
      src="/images/warframe_logo.png"
      alt="Warframe Header Logo"
      width={80}
      height={80}
      className="w-20 h-20 sm:w-10 sm:h-10 md:w-15 md:h-15 lg:w-20 lg:h-20 select-none"
    />
  </div>
);

export default Logo;
