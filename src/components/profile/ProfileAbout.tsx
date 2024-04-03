interface MyComponentProps {
  isConnection: boolean;
}

const ProfileAbout: React.FC<MyComponentProps> = ({ isConnection }) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p>he/him</p>
        <p>
          Hi I’m on MEU, where are you? lorem ipsum dolor sit amet, lorem ipsum
          dolor sit amet, lorem ipsum dolor sit amet.
        </p>
      </div>
      <div>
        <p className="text-[#8D8E90]">Job Title, Organization</p>
        <p className="text-[#8D8E90]">Gurugram, India</p>
      </div>
      {isConnection && (
        <div className="text-[#8D8E90]">
          <p>You both connected at Pragati Maidan on Feb 29, 2024.</p>
          <p>Your personal note for the person goes here.</p>
        </div>
      )}
      <hr className="border-[1px] border-[#A3A5A6]" />
    </div>
  );
};

export default ProfileAbout;
