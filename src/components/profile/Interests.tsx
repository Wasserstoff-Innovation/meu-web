const Interests = ({ interests }: { interests?: string[] }) => {
  return (
    <div>
      <h1>Interests</h1>
      <div className="flex gap-2 flex-wrap">
        {interests?.map((interest, index) => (
          <p key={index} className="bg-white p-1 text-black rounded-full px-2">
            {interest}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Interests;
