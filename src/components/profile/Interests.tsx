const userInterest = [
  "interest",
  "interest",
  "interest",
  "interest",
  "interest",
];

const Interests = () => {
  return (
    <div>
      <h1>Interests</h1>
      <div className="flex gap-2 flex-wrap">
        {userInterest.map((interest, index) => (
          <p key={index} className="bg-white p-1 text-black rounded-full px-2">
            {interest}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Interests;
