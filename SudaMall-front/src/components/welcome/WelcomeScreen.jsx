const WelcomeScreen = ({ image, text }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center px-16 -mt-20">
      <img src={image} alt="Welcome" className="w-74 h-74 object-contain mb-4" loading="eager" />
      <p className="text-xl font-bold text-gray-700">{text}</p>
    </div>
  );
};

export default WelcomeScreen;
