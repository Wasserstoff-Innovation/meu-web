import { useState } from "react";
import PopUpOption from "./PopUpOption";


const ProfilePicture = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="flex" onClick={() => setToggle(false)}>
      <div className="relative  ">
        {" "}
        <img
          src="https://s3-alpha-sig.figma.com/img/8132/945e/e84fd7afd04dcd00ef8308dad1467dd6?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=OZh-nsOdoLNdeLZvapUL8hJxZV8kZ8fzTTghGH9mbJVZgn~HuQBQ5VRCvGSNT5taNL3PddwCHI8cjbnQl0BZIPDkNy2nXKt1nK6jh6bXj~c7V-S4pTngtuYo56LFjjHHVyD7jnqim8NNHOWopNd1Ulfcml00sbXRhnFD0CzB7SkN7txcEV2LG5GuqI0eIGM3I39oahwYTsJn3vFdxp~MxTO5nKeKh6yeikCaSEl5FQ4zHmVyBzRJdcwdyDOzaehIXppOAIXk2sO8XWqXajCvSJ32ucvlZIcU2ATfan0ha86fry65IMKtOuEV8~hjf-jg2czebA4zkR3BDj5mUTVJ-g__"
          alt=""
          className=""
        />
        <div>
          <div className="absolute w-full top-4 px-4 flex justify-between gap-4">
            <div className="flex gap-4">
              <img
                src="./arrow_left_alt.svg"
                alt="right arrow"
                className="cursor-pointer"
              />
              <p className="cursor-pointer">johndoe</p>
            </div>
            <img
              src="./option.svg"
              alt="option"
              className="cursor-pointer"
              onClick={(e) => {
                setToggle(!toggle);
                e.stopPropagation();
              }}
            />
            {toggle && <PopUpOption />}
          </div>

          <div className="flex justify-between w-full px-4 items-center absolute bottom-4 ">
            <div className=" flex gap-4">
              <h1 className="text-[36px] cursor-pointer">John Doe</h1>
            </div>
            <div className="p-2 bg-white rounded-full">
              <img src="./share.svg" alt="share" className="cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePicture;
