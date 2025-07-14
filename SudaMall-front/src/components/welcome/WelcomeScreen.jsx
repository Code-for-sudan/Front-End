const WelcomeScreen = ({ image, text }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-16">
      <img 
        src={image} 
        alt="Welcome" 
        className="w-74 h-74 object-contain mb-4"
        width={296}  // 74 * 4 (assuming Tailwind w-74 = 18.5rem)
        height={296}
        loading="eager"
      />
      <p className="text-base font-bold text-gray-700">{text}</p>
    </div>
  );
};

export default WelcomeScreen;
