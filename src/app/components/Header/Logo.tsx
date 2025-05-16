import Image from 'next/image';

const Logo = () => (
  <div>
    <Image
      src="/images/warframe_logo.png"
      alt="Warframe Header Logo"
      width={80}
      height={80}
      className="w-20 h-20 sm:w-12 sm:h-12 md:w-15 md:h-15 lg:w-18 lg:h-18 select-none"
      draggable = "false"
    />
  </div>
);

export default Logo;
