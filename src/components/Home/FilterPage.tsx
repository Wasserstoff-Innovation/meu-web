
import {
  Modal,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import Toggle from "./Toggle";

const items = [
  {
    id: 1,
    label: "Investment/investor",
    isSelected: false,
  },
  {
    id: 2,
    label: "Mentee/mentor",
    isSelected: false,
  },
  {
    id: 3,
    label: "Internship",
    isSelected: false,
  },
  {
    id: 4,
    label: "Networking",
    isSelected: false,
  },
  {
    id: 5,
    label: "Mentee/mentor",
    isSelected: false,
  },
  {
    id: 6,
    label: "Internship",
    isSelected: false,
  },
  {
    id: 7,
    label: "Networking",
    isSelected: false,
  },
];

export default function FilterPage() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selected, setSelected] = useState<typeof items>([]);
  const [list, setList] = useState(items);

  const handleAdd = (id: number) => {
    const findIndx = selected.find((select) => select.id === id);

    if (findIndx) {
      const tempList = selected.filter((select) => select.id !== id)
      setSelected(tempList)

      const updatedItems = list.map((item) => {
        if (item.id === id) {
          return { ...item,isSelected:false  };
        }
        return item; 
      });
      setList(updatedItems);

    }
    else {
      const tempArr = list.filter((li) => li.id === id);
      setSelected((prev) => [...prev, ...tempArr]);
      const updatedItems = list.map((item) => {
        // Find the item by id and update its value
        if (item.id === id) {
          return { ...item, isSelected: true }; 
        }
        return item; 
      });
      setList(updatedItems);
    }
  };

  const handleRemove = (id: number) => {
    const tempArr = selected.filter((select) => select.id !== id)
    setSelected(tempArr)
  }

  return (
    <>
      <div
        className="flex bg-[#313437] flex-3 p-2  justify-between items-center rounded-md border-1 border-[#A3A5A6] cursor-pointer"
        onClick={onOpen}
      >
        <div className="flex items-center gap-2">
          <div className="">
            <img src="./search.svg" alt="" className="cursor-pointer" />
          </div>
          <div>Add this filter</div>
        </div>
        <img src="./icons/add.svg" alt="add" className=" cursor-pointer" />

        {/* modal */}
      </div>
      <div className={`${selected.length > 0 && "pt-2"}`}>
        {selected.map((select) => (
          <div className="flex py-1" key={select.id}>
            <div className="flex items-center gap-2 border-1 p-2 rounded-full px-4">
              <div className="size-4 bg-[#8D8E90] rounded-sm"> </div>
              <div>{select.label}</div>
              <div className="">
                <img
                  src="./close.svg"
                  alt="close"
                  className="size-2 cursor-pointer"
                  onClick={() => handleRemove(select.id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* modal */}
      <Modal
        isOpen={isOpen}
        placement="bottom"
        onOpenChange={onOpenChange}
        className="bg-[#1A1D21] text-white max-w-[24rem] "
      >
        <ModalContent className="">
          {() => (
            <>
              <ModalHeader className="flex gap-2 items-center ">
                <div className="flex  w-full">
                  <div>
                    <div>What you are looking for on </div>
                    <div>
                      <div>MEU? </div>
                    </div>
                  </div>
                </div>
              </ModalHeader>
              <div>
                {list.map((item) => (
                  <div
                    className="flex justify-between items-center px-4"
                    onClick={() => handleAdd(item.id)}
                  >
                    <div className="flex gap-2 items-center p-2 px-4 cursor-pointer">
                      <div className="bg-[#8D8E90] rounded-sm size-4"></div>
                      <div>{item.label}</div>
                    </div>
                    {item.isSelected && (
                      <div>
                        <img
                          src="./icons/tick.svg"
                          alt="tick"
                          className="size-4"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {list.length > 0 && (
                <Toggle title="Show other people if I run out" />
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
